/** Node-only Git operations. No shell expansion, HTTP listener, Python, or source checkout. */
import {spawn, type ChildProcess} from 'node:child_process';
import {randomUUID} from 'node:crypto';
import {open,readFile,writeFile,mkdir,mkdtemp,realpath,lstat,readdir,rename,rmdir,rm,chmod,symlink} from 'node:fs/promises';
import path from 'node:path';
import type {Commit,GitRef,GitTreeConfig,Metrics,OwnedTag,ExportInfo} from './types.ts';

const MARKERS='refs/git-tree-viz/tags/';
const HASH=/^[0-9a-f]{7,64}$/i;
/** Resolve deployment settings once and reject invalid values at plugin activation. */
export function resolveConfig(input:Partial<GitTreeConfig>={}):GitTreeConfig {
  const result={gitTimeoutMs:input.gitTimeoutMs??120000,maxOutputBytes:input.maxOutputBytes??134217728,maxPatchCharacters:input.maxPatchCharacters??200000};
  for(const [key,value] of Object.entries(result))if(!Number.isSafeInteger(value)||value<1)throw new Error(`Invalid ${key}: expected a positive integer`);
  return result;
}
/** Whether a canonical candidate is inside a canonical parent, including the parent itself. */
function inside(parent:string,candidate:string):boolean {
  const relative=path.relative(parent,candidate);
  return relative===''||(!relative.startsWith('..'+path.sep)&&relative!=='..'&&!path.isAbsolute(relative));
}
async function exists(file:string):Promise<boolean>{try{await lstat(file);return true;}catch(error){if((error as NodeJS.ErrnoException).code==='ENOENT')return false;throw error;}}
/** Read exact byte ranges from a child stream without buffering an entire repository. */
class ByteReader {
  private buffer=Buffer.alloc(0);
  private readonly iterator:AsyncIterator<Buffer|string>;
  constructor(stream:NodeJS.ReadableStream){this.iterator=stream[Symbol.asyncIterator]();}
  async read(size:number):Promise<Buffer>{
    while(this.buffer.length<size){const next=await this.iterator.next();if(next.done)throw new Error('Git blob stream ended early');this.buffer=Buffer.concat([this.buffer,typeof next.value==='string'?Buffer.from(next.value):next.value]);}
    const result=this.buffer.subarray(0,size);this.buffer=this.buffer.subarray(size);return result;
  }
  async line():Promise<string>{
    while(!this.buffer.includes(10)){const next=await this.iterator.next();if(next.done)throw new Error('Git blob header missing');this.buffer=Buffer.concat([this.buffer,typeof next.value==='string'?Buffer.from(next.value):next.value]);}
    const end=this.buffer.indexOf(10);const result=this.buffer.subarray(0,end).toString('utf8');this.buffer=this.buffer.subarray(end+1);return result;
  }
}
/** Lifecycle-owned engine, write capabilities, serial tag transactions and completed exports. */
export class GitEngine {
  private readonly children=new Set<ChildProcess>();
  private readonly grants=new Map<string,{repo:string;owner:string}>();
  private readonly exports=new Set<string>();
  private mutations:Promise<void>=Promise.resolve();
  private disposed=false;
  constructor(readonly config:GitTreeConfig){}

  private async command(repo:string,args:string[],signal?:AbortSignal,input?:string):Promise<Buffer>{
    if(this.disposed)throw new Error('Git Tree plugin is stopped');
    signal?.throwIfAborted();
    return new Promise((resolve,reject)=>{
      const child=spawn('git',['-C',repo,...args],{windowsHide:true,stdio:['pipe','pipe','pipe'],env:{...process.env,GIT_TERMINAL_PROMPT:'0',GIT_LFS_SKIP_SMUDGE:'1'}});
      this.children.add(child);const output:Buffer[]=[];const errors:Buffer[]=[];let size=0;let failure:Error|undefined;
      const cancel=()=>{failure=new Error('Git operation cancelled');child.kill();};
      const timer=setTimeout(()=>{failure=new Error('Git operation timed out');child.kill();},this.config.gitTimeoutMs);
      signal?.addEventListener('abort',cancel,{once:true});
      child.stdout.on('data',(chunk:Buffer)=>{size+=chunk.length;if(size>this.config.maxOutputBytes){failure=new Error('Git output exceeds the configured limit');child.kill();}else output.push(chunk);});
      child.stderr.on('data',(chunk:Buffer)=>{if(errors.reduce((n,b)=>n+b.length,0)<65536)errors.push(chunk);});
      child.on('error',error=>{failure=error;});
      child.on('close',code=>{
        clearTimeout(timer);signal?.removeEventListener('abort',cancel);this.children.delete(child);
        if(failure)reject(failure);else if(code!==0)reject(new Error(Buffer.concat(errors).toString('utf8').trim()||`Git exited ${code}`));else resolve(Buffer.concat(output));
      });
      child.stdin.on('error',error=>{if(!failure)failure=error;});child.stdin.end(input);
    });
  }
  private async git(repo:string,args:string[],signal?:AbortSignal,input?:string):Promise<string>{return (await this.command(repo,args,signal,input)).toString('utf8').replace(/\r\n/g,'\n');}
  private async source(repo:string,hash:string,signal?:AbortSignal):Promise<{repo:string;hash:string}>{
    if(!HASH.test(hash))throw new Error('请选择有效的提交哈希');
    const root=await realpath((await this.git(repo,['rev-parse','--show-toplevel'],signal)).trim());
    return {repo:root,hash:(await this.git(root,['rev-parse','--verify',hash+'^{commit}'],signal)).trim()};
  }
  private async repoKey(repo:string):Promise<string>{const common=(await this.git(repo,['rev-parse','--git-common-dir'])).trim();const key=await realpath(path.resolve(repo,common));return process.platform==='win32'?key.toLowerCase():key;}
  private async exclusive<T>(operation:()=>Promise<T>):Promise<T>{const result=this.mutations.then(operation);this.mutations=result.then(()=>{},()=>{});return result;}

  /** Read branch/tag references and their commit attachment map. */
  async references(repo:string,signal?:AbortSignal):Promise<{refs:GitRef[];commit_refs:Record<string,GitRef[]>}>{
    const text=await this.git(repo,['for-each-ref','--format=%(objectname)|%(*objectname)|%(refname)|%(objecttype)|%(creatordate:iso-strict)'],signal);
    const refs:GitRef[]=[],commit_refs:Record<string,GitRef[]>={};
    for(const line of text.trim().split('\n')){
      const [obj,peeled,full,type,date]=line.split('|');if(!full)continue;
      const kind=full.startsWith('refs/heads/')?'branch':full.startsWith('refs/tags/')?'tag':full.startsWith('refs/remotes/')?'remote':null;
      if(!kind)continue;const name=full.replace(/^refs\/(heads|tags|remotes)\//,'');if(kind==='remote'&&name.endsWith('/HEAD'))continue;
      refs.push({name,kind,type,date});(commit_refs[peeled||obj]??=[]).push({name,kind});
    }return {refs,commit_refs};
  }
  /** Read all user-visible history without internal automation/ownership refs. */
  async graph(repo:string,signal?:AbortSignal){
    const root=await realpath(repo);const format=['%H','%P','%an','%ae','%aI','%s','%b'].join('%x1f')+'%x1e';
    const text=await this.git(root,['log','--exclude=refs/codex/*','--exclude=refs/git-tree-viz/*','--all','--date-order','--pretty=format:'+format],signal);
    const {refs,commit_refs}=await this.references(root,signal);const commits:Commit[]=[];
    for(const record of text.split('\x1e')){const p=record.replace(/^\n+/,'').split('\x1f');if(p.length<7)continue;commits.push({hash:p[0],parents:p[1].split(' ').filter(Boolean),author:p[2],email:p[3],date:p[4],subject:p[5],body:p.slice(6).join('\x1f').trim(),refs:commit_refs[p[0]]||[]});}
    const head=(await this.git(root,['symbolic-ref','--quiet','--short','HEAD'],signal).catch(()=>Promise.resolve(''))).trim();
    const head_hash=commits.length?(await this.git(root,['rev-parse','HEAD'],signal).catch(()=>Promise.resolve(''))).trim():'';
    const main=refs.find(r=>r.kind==='branch'&&r.name==='main')||refs.find(r=>r.kind==='branch'&&r.name==='master')||refs.find(r=>r.kind==='branch'&&r.name===head);
    const main_hash=commits.find(c=>main&&c.refs.some(r=>r.kind==='branch'&&r.name===main.name))?.hash||head_hash;
    const dates=commits.map(c=>c.date).sort();
    return {repo:root,head,head_hash,main_hash,main_branch:main?.name||head,refs,commits,owned_tags:await this.ownedTags(root),stats:{commits:commits.length,branches:refs.filter(r=>r.kind==='branch').length,tags:refs.filter(r=>r.kind==='tag').length,merges:commits.filter(c=>c.parents.length>1).length,roots:commits.filter(c=>!c.parents.length).length,first_date:dates[0]||'',last_date:dates.at(-1)||''}};
  }
  /** Batch text/file changes, including roots and merges against their first parent. */
  async metrics(repo:string,signal?:AbortSignal):Promise<Record<string,Metrics>>{
    const text=await this.git(repo,['log','--exclude=refs/codex/*','--exclude=refs/git-tree-viz/*','--all','--root','--diff-merges=first-parent','--no-renames','--no-ext-diff','--no-textconv','--numstat','-z','--format=%x1e%H%x00'],signal);
    const result:Record<string,Metrics>={};
    for(const record of text.split('\x1e')){const end=record.indexOf('\0');if(end<0)continue;const hash=record.slice(0,end).trim();if(!HASH.test(hash))continue;const metric={additions:0,deletions:0,files:0,edits:0};
      for(const entry of record.slice(end+1).split('\0')){const fields=entry.replace(/^\n+/,'').split('\t');if(fields.length<3)continue;metric.files++;metric.additions+=fields[0]==='-'?0:Number(fields[0]);metric.deletions+=fields[1]==='-'?0:Number(fields[1]);}metric.edits=metric.additions+metric.deletions;result[hash]=metric;
    }return result;
  }
  /** Read changed files and a bounded textual patch relative to one parent. */
  async detail(repo:string,hash:string,parent=0,file='',signal?:AbortSignal){
    const source=await this.source(repo,hash,signal);const parents=(await this.git(source.repo,['show','-s','--format=%P',source.hash],signal)).trim().split(' ').filter(Boolean);
    if(!Number.isInteger(parent)||parent<0||parent>=Math.max(1,parents.length))throw new Error('父提交不存在');
    const base=parents[parent]||'';const diff=base?['diff',base,source.hash]:['diff-tree','--root','--no-commit-id','-r',source.hash];const common=['--no-ext-diff','--no-textconv','--no-renames'];
    const nums=await this.git(source.repo,[...diff,...common,'--numstat','-z'],signal);const statusText=await this.git(source.repo,[...diff,...common,'--name-status','-z'],signal);const status=statusText.split('\0');const statuses=new Map<string,string>();for(let i=0;i+1<status.length;i+=2)statuses.set(status[i+1],status[i]);
    const files=nums.split('\0').filter(Boolean).map(record=>{const a=record.indexOf('\t'),b=record.indexOf('\t',a+1);const added=record.slice(0,a),deleted=record.slice(a+1,b),name=record.slice(b+1);return {path:name,status:statuses.get(name)||'M',additions:added==='-'?null:Number(added),deletions:deleted==='-'?null:Number(deleted)};});
    if(file&&!files.some(f=>f.path===file))throw new Error('文件不在本次变更中');
    const patch=await this.git(source.repo,['--literal-pathspecs',...diff,...common,'--patch','--no-color','--',...(file?[file]:[])],signal);
    return {hash:source.hash,parents,base,files,patch:patch.slice(0,this.config.maxPatchCharacters),truncated:patch.length>this.config.maxPatchCharacters,path:file};
  }
  private async tree(repo:string,hash:string,signal?:AbortSignal):Promise<{mode:string;object:string;path:string}[]>{
    const text=await this.git(repo,['ls-tree','-r','-z','--full-tree',hash],signal);
    return text.split('\0').filter(Boolean).map(record=>{const tab=record.indexOf('\t');const [mode,,object]=record.slice(0,tab).split(' ');return {mode,object,path:record.slice(tab+1)};});
  }
  /** Identify submodules, LFS rules and symlinks before an export is accepted. */
  async exportInfo(repo:string,hash:string,signal?:AbortSignal):Promise<ExportInfo>{
    const source=await this.source(repo,hash,signal);const entries=await this.tree(source.repo,source.hash,signal);const submodules=entries.filter(e=>e.mode==='160000').map(e=>e.path);let lfs=false;
    for(const entry of entries)if(path.posix.basename(entry.path)==='.gitattributes'&&entry.mode!=='120000')lfs||=(await this.git(source.repo,['show',source.hash+':'+entry.path],signal)).includes('filter=lfs');
    const symlinks=entries.filter(e=>e.mode==='120000').length;const warnings:string[]=[];
    if(submodules.length)warnings.push(`包含 ${submodules.length} 个子模块：仅创建空目录，不下载子模块内容。`);
    if(lfs)warnings.push('此版本包含 Git LFS 规则：保留已提交的指针文件，不下载 LFS 大文件。');
    if(symlinks&&process.platform==='win32')warnings.push('此版本包含符号链接：Windows 不允许创建链接时，会保留链接目标文本。');
    return {...source,files:entries.filter(e=>e.mode!=='160000').length,submodules,lfs,symlinks,warnings};
  }
  private async destination(source:string,destination:string):Promise<string>{
    if(!destination||!path.isAbsolute(destination))throw new Error('请输入目标文件夹的绝对路径');
    if(await exists(destination)){const stat=await lstat(destination);if(stat.isSymbolicLink())throw new Error('目标不能是符号链接或目录联接');if(!stat.isDirectory()||(await readdir(destination)).length)throw new Error('目标文件夹必须不存在或为空，不会覆盖已有文件');}
    const parent=await realpath(path.dirname(destination));const resolved=path.join(parent,path.basename(destination));
    if(inside(source,resolved))throw new Error('请使用源仓库之外的目标文件夹');return resolved;
  }
  private async snapshot(repo:string,hash:string,target:string):Promise<void>{
    const entries=(await this.tree(repo,hash)).sort((a,b)=>Number(a.mode==='120000')-Number(b.mode==='120000'));
    const child=spawn('git',['-C',repo,'cat-file','--batch'],{windowsHide:true,stdio:['pipe','pipe','pipe']});this.children.add(child);
    const reader=new ByteReader(child.stdout);let processError:Error|undefined;const errors:Buffer[]=[];
    child.on('error',error=>{processError=error;});child.stdin.on('error',error=>{processError=error;});child.stderr.on('data',(b:Buffer)=>errors.push(b));
    const done=new Promise<void>((resolve,reject)=>child.on('close',code=>{this.children.delete(child);if(processError)reject(processError);else if(code)reject(new Error(Buffer.concat(errors).toString('utf8')||'Git blob read failed'));else resolve();}));
    // Attach immediately so a premature child exit never becomes an unhandled rejection.
    void done.catch(()=>{});const timer=setTimeout(()=>child.kill(),this.config.gitTimeoutMs);
    try{
      for(const entry of entries){const segments=entry.path.split('/');if(segments.some(p=>!p||p==='.'||p==='..'||p.toLowerCase()==='.git'))throw new Error('提交包含不能安全导出的文件路径');
        if(process.platform==='win32'&&(/[\\:]/.test(entry.path)||segments.some(p=>/[. ]$/.test(p)||/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(p))))throw new Error('提交包含 Windows 不支持的文件路径：'+entry.path);
        const file=path.resolve(target,...segments);if(!inside(target,file))throw new Error('提交文件路径超出目标目录');
        if(entry.mode==='160000'){await mkdir(file,{recursive:true});continue;}
        await mkdir(path.dirname(file),{recursive:true});child.stdin.write(entry.object+'\n');const header=(await reader.line()).split(' ');if(header[1]!=='blob')throw new Error('无法读取提交文件：'+entry.path);let remaining=Number(header[2]);if(!Number.isSafeInteger(remaining)||remaining<0)throw new Error('Git 文件流格式错误');
        if(entry.mode==='120000'){const bytes=await reader.read(remaining);const link=bytes.toString('utf8');if(path.isAbsolute(link)||!inside(target,path.resolve(path.dirname(file),link)))throw new Error('符号链接指向导出目录之外：'+entry.path);try{await symlink(link,file);}catch(error){if(process.platform!=='win32')throw error;await writeFile(file,bytes);}}
        else{const output=await open(file,'wx');try{while(remaining){const chunk=await reader.read(Math.min(remaining,1024*1024));await output.writeFile(chunk);remaining-=chunk.length;}}finally{await output.close();}if(entry.mode==='100755'&&process.platform!=='win32')await chmod(file,0o755);}
        if((await reader.read(1))[0]!==10)throw new Error('Git 文件流格式错误');
      }child.stdin.end();await done;
    }catch(error){child.kill();await done.catch(()=>{});throw error;}finally{clearTimeout(timer);}
  }
  /** Export committed state into a staged, empty-or-new sibling destination. */
  async export(repo:string,hash:string,destination:string,includeGit:boolean,branch:string){
    const info=await this.exportInfo(repo,hash);const target=await this.destination(info.repo,destination);branch=branch.trim();
    if(branch){if(!includeGit)throw new Error('仅带 Git 仓库模式支持创建分支');await this.git(info.repo,['check-ref-format','--branch',branch]);}
    const parent=path.dirname(target);const stage=await mkdtemp(path.join(parent,'.git-tree-export-'));
    try{
      if(includeGit){await this.git(info.repo,['clone','--no-checkout','--no-hardlinks','--dissociate','--',info.repo,stage]);await this.git(stage,['-c','core.hooksPath='+path.join(stage,'.git','export-no-hooks'),'-c','filter.lfs.required=false','-c','filter.lfs.smudge=','-c','filter.lfs.process=','checkout',...(branch?['-b',branch]:['--detach']),info.hash]);}
      else await this.snapshot(info.repo,info.hash,stage);
      await this.exclusive(async()=>{await this.destination(info.repo,target);if(await exists(target))await rmdir(target);await rename(stage,target);this.exports.add(target);});
      return {path:target,hash:info.hash,include_git:includeGit,branch:includeGit?branch:'',files:info.files,warnings:info.warnings};
    }finally{if(path.dirname(stage)!==parent||!path.basename(stage).startsWith('.git-tree-export-'))throw new Error('Invalid export staging path');await rm(stage,{recursive:true,force:true});}
  }
  /** Open only a canonical directory successfully exported by this engine instance. */
  async openExport(folder:string):Promise<{path:string}>{
    const canonical=await realpath(folder);if(!this.exports.has(canonical))throw new Error('只能打开本次服务成功导出的文件夹');
    const command=process.platform==='win32'?'explorer.exe':process.platform==='darwin'?'open':'xdg-open';
    await new Promise<void>((resolve,reject)=>{const child=spawn(command,[canonical],{windowsHide:true,detached:true,stdio:'ignore'});child.once('error',reject);child.once('spawn',()=>{child.unref();resolve();});});return {path:canonical};
  }
  /** Grant/revoke one owner Peer capability for one Git common directory. */
  async writeAccess(repo:string,enabled:boolean,token:string,owner:string):Promise<{enabled:boolean;token:string}>{
    return this.exclusive(async()=>{const key=await this.repoKey(repo);if(enabled){const grant=randomUUID();this.grants.set(grant,{repo:key,owner});return {enabled:true,token:grant};}if(this.grants.get(token)?.owner===owner&&this.grants.get(token)?.repo===key)this.grants.delete(token);return {enabled:false,token:''};});
  }
  private async requireWrite(repo:string,token:string,owner:string){const grant=this.grants.get(token);if(!grant||grant.owner!==owner||grant.repo!==await this.repoKey(repo))throw new Error('源仓库当前为只读，请先在右上角开启读写模式');}
  /** Ownership survives view and plugin reloads through private Git refs. */
  async ownedTags(repo:string):Promise<OwnedTag[]>{
    const tags=(await this.git(repo,['for-each-ref','--format=%(refname)%00%(objectname)','refs/tags/'])).trim().split('\n').filter(Boolean);const actual=new Map(tags.map(line=>line.split('\0') as [string,string]));
    const markers=(await this.git(repo,['for-each-ref','--format=%(refname)%00%(objectname)',MARKERS])).trim().split('\n').filter(Boolean);
    return markers.map(line=>{const [ref,hash]=line.split('\0'),name=ref.slice(MARKERS.length),current=actual.get('refs/tags/'+name);return {name,hash,status:current===undefined?'missing':current===hash?'unchanged':'changed'};});
  }
  private async transaction(repo:string,commands:string[]){if(commands.length)await this.git(repo,['update-ref','--no-deref','--stdin'],undefined,'start\n'+commands.join('\n')+'\nprepare\ncommit\n');}
  private async tagState(repo:string){return {...await this.references(repo),owned_tags:await this.ownedTags(repo)};}
  /** Atomically create a new local lightweight tag and its app-ownership marker. */
  async createTag(repo:string,hash:string,name:string,token:string,owner:string){
    return this.exclusive(async()=>{await this.requireWrite(repo,token,owner);name=name.trim();if(!name||name.startsWith('-')||name.startsWith('refs/')||name==='HEAD')throw new Error('请输入标签短名称，例如 v1.0 或 review/important');const source=await this.source(repo,hash);await this.git(source.repo,['check-ref-format','refs/tags/'+name]);await this.transaction(source.repo,[`create ${JSON.stringify('refs/tags/'+name)} ${source.hash}`,`create ${JSON.stringify(MARKERS+name)} ${source.hash}`]);return {name,hash:source.hash,...await this.tagState(source.repo)};});
  }
  /** Revert all unchanged app-created tags, preserving manual and subsequently moved tags. */
  async undoTags(repo:string,token:string,owner:string){
    return this.exclusive(async()=>{await this.requireWrite(repo,token,owner);const owned=await this.ownedTags(repo);const removed:string[]=[],skipped:string[]=[],missing:string[]=[],commands:string[]=[];
      for(const tag of owned){if(tag.status==='changed'){skipped.push(tag.name);continue;}if(tag.status==='unchanged'){commands.push(`delete ${JSON.stringify('refs/tags/'+tag.name)} ${tag.hash}`);removed.push(tag.name);}else missing.push(tag.name);commands.push(`delete ${JSON.stringify(MARKERS+tag.name)} ${tag.hash}`);}
      await this.transaction(repo,commands);return {removed,skipped,missing,...await this.tagState(repo)};
    });
  }
  /** Revoke grants and stop outstanding reads after accepted mutations have settled. */
  async dispose():Promise<void>{await this.mutations;this.disposed=true;this.grants.clear();await Promise.all([...this.children].map(child=>new Promise<void>(resolve=>{child.once('close',()=>resolve());child.kill();})));this.exports.clear();}
}
