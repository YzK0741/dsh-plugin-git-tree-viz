import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,mkdir,rm,access} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {GitEngine} from '../lib/engine.js';
const config={gitTimeoutMs:30000,maxOutputBytes:16*1024*1024,maxPatchCharacters:200000};
async function fixture(t){
  const home=await mkdtemp(path.join(tmpdir(),'dsh-git-tree-'));
  t.after(()=>rm(home,{recursive:true,force:true}));
  const repo=path.join(home,'source');await mkdir(repo);
  const git=(...args)=>execFileSync('git',['-C',repo,...args],{encoding:'utf8',windowsHide:true}).trim();
  git('init','-b','main');git('config','user.name','Test Author');git('config','user.email','test@example.com');git('config','core.autocrlf','false');
  await writeFile(path.join(repo,'hello.txt'),'first\n');git('add','.');git('commit','-m','feat: initial');const root=git('rev-parse','HEAD');
  await writeFile(path.join(repo,'hello.txt'),'first\nsecond\n');git('commit','-am','fix: update');const tip=git('rev-parse','HEAD');
  const engine=new GitEngine(config);t.after(()=>engine.dispose());
  return {home,repo,git,root,tip,engine};
}
test('graph, root and parent diffs and batch metrics use real Git history',async t=>{
  const f=await fixture(t);const graph=await f.engine.graph(f.repo);
  assert.equal(graph.commits.length,2);assert.equal(graph.head_hash,f.tip);
  const detail=await f.engine.detail(f.repo,f.root);assert.equal(detail.files[0].additions,1);assert.match(detail.patch,/\+first/);
  const update=await f.engine.detail(f.repo,f.tip);assert.match(update.patch,/\+second/);
  const metrics=await f.engine.metrics(f.repo);assert.equal(metrics[f.root].edits,1);assert.equal(metrics[f.tip].files,1);
});
test('snapshot exports selected committed bytes, including export-ignore and binary files',async t=>{
  const f=await fixture(t);await writeFile(path.join(f.repo,'.gitattributes'),'hello.txt export-ignore\n');
  await writeFile(path.join(f.repo,'中文.bin'),Buffer.from([0,255,10]));f.git('add','.');f.git('commit','-m','binary');const commit=f.git('rev-parse','HEAD');
  await writeFile(path.join(f.repo,'hello.txt'),'dirty');await writeFile(path.join(f.repo,'untracked'),'private');
  const destination=path.join(f.home,'snapshot');await f.engine.export(f.repo,commit,destination,false,'');
  assert.equal(await readFile(path.join(destination,'hello.txt'),'utf8'),'first\nsecond\n');
  assert.deepEqual(await readFile(path.join(destination,'中文.bin')),Buffer.from([0,255,10]));
  await assert.rejects(access(path.join(destination,'.git')));await assert.rejects(access(path.join(destination,'untracked')));
  await assert.rejects(f.engine.export(f.repo,commit,destination,false,''),/为空|empty/);
  assert.equal(f.git('rev-parse','HEAD'),commit);assert.equal(await readFile(path.join(f.repo,'hello.txt'),'utf8'),'dirty');
});
test('Git export is independent and checks out the selected version on an optional branch',async t=>{
  const f=await fixture(t);const destination=path.join(f.home,'clone');await f.engine.export(f.repo,f.root,destination,true,'review/version');
  const git=(...args)=>execFileSync('git',['-C',destination,...args],{encoding:'utf8',windowsHide:true}).trim();
  assert.equal(git('rev-parse','HEAD'),f.root);assert.equal(git('branch','--show-current'),'review/version');
  await assert.rejects(access(path.join(destination,'.git','objects','info','alternates')));
});
test('write grants are owner/repository scoped and undo-all preserves manual and moved tags',async t=>{
  const f=await fixture(t);await assert.rejects(f.engine.createTag(f.repo,f.root,'review/test','', 'owner-a'),/只读|read.only/);
  const grant=await f.engine.writeAccess(f.repo,true,'','owner-a');
  await f.engine.createTag(f.repo,f.root,'review/test',grant.token,'owner-a');
  await f.engine.createTag(f.repo,f.root,'review/safe',grant.token,'owner-a');f.git('tag','manual',f.root);
  f.git('update-ref','refs/tags/review/test',f.tip);
  await assert.rejects(f.engine.undoTags(f.repo,grant.token,'owner-b'),/只读|read.only/);
  const result=await f.engine.undoTags(f.repo,grant.token,'owner-a');assert.deepEqual(result.removed,['review/safe']);assert.deepEqual(result.skipped,['review/test']);
  assert.equal(f.git('rev-parse','refs/tags/manual'),f.root);
  await f.engine.writeAccess(f.repo,false,grant.token,'owner-a');await assert.rejects(f.engine.undoTags(f.repo,grant.token,'owner-a'));
});
test('invalid names and destinations cannot mutate a repository or overwrite data',async t=>{
  const f=await fixture(t);const grant=await f.engine.writeAccess(f.repo,true,'','owner-a');
  for(const name of ['','-bad','bad..name','has space','HEAD'])await assert.rejects(f.engine.createTag(f.repo,f.root,name,grant.token,'owner-a'));
  for(const dest of ['', 'relative',f.repo,path.join(f.repo,'inside')])await assert.rejects(f.engine.export(f.repo,f.root,dest,false,''));
  f.git('tag','manual',f.root);await assert.rejects(f.engine.createTag(f.repo,f.root,'manual',grant.token,'owner-a'));assert.equal((await f.engine.ownedTags(f.repo)).length,0);
});
