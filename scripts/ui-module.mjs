import {readFile} from 'node:fs/promises';
/** Compile the maintained SVG interface into a scoped function, never eval/iframe/srcdoc. */
export async function uiModule(){
  const [markup,styles,i18n,app]=await Promise.all(['index.html','style.css','i18n.js','app.js'].map(file=>readFile(new URL('../src/ui/'+file,import.meta.url),'utf8')));
  const body=markup.match(/<body>([\s\S]*?)<\/body>/)[1].replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<a class="brand"[^>]*>/,'<div class="brand">').replace('</a>','</div>');
  const css=styles.replaceAll(':root',':host').replaceAll('html,body',':host').replaceAll('html, body',':host').replaceAll('html[lang=', '#git-tree-root[lang=').replace(/\bbody\{/g,'#git-tree-root{').replaceAll('height:100dvh','height:100%').replaceAll('position:fixed;bottom:46px','position:absolute;bottom:46px')+`
    :host{display:block;height:100%;width:100%;color:var(--text);--bg:var(--dsw-alias-bg-base,#101316);--panel:var(--dsw-alias-bg-layer-1,#15191d);--raised:var(--dsw-alias-bg-layer-2,#1c2227);--border:var(--dsw-alias-border-l1,#2a3036)}
    #git-tree-root{height:100%;min-height:0;position:relative;overflow:hidden}#languageSelect{display:none}.brand{pointer-events:none}
    :host{container:git-tree-panel/size}#detail,#detailContent{min-height:0}#scroller,#detailContent{overscroll-behavior:contain}
    #detailContent{padding-bottom:calc(22px + var(--dsh-composer-height,152px))}#scroller{padding-bottom:var(--dsh-composer-height,152px);box-sizing:border-box;scroll-padding-bottom:var(--dsh-composer-height,152px)}
    @container git-tree-panel (max-height:480px){.overview{display:none}#topbar{padding:6px 12px;height:auto;gap:8px}.brand{display:none}.toolbar{padding:6px 12px;max-height:88px;overflow:auto;flex-shrink:0}.graph-caption,.graph-footer{display:none}}
    @container git-tree-panel (max-height:300px){#topbar{display:none}.toolbar{max-height:52px}}
    :host([data-theme=light]){--bg:#f6f8fa;--panel:#fff;--raised:#eef2f5;--border:#d4dce3;--text:#25303b;--muted:#657380;--accent:#28754c}
    :host([data-theme=light]) .toolbar,:host([data-theme=light]) .export-panel{background:var(--panel)}
    :host([data-theme=light]) .graph-caption,:host([data-theme=light]) .detail-top{border-color:var(--border)}
    :host([data-theme=light]) #graph .commit-row:hover .row-bg{fill:#dbe9e0}:host([data-theme=light]) #graph .commit-row.selected .row-bg{fill:#d0e5d7}
    :host([data-theme=light]) #graph .commit-row.filter-hit:not(.selected):not(.matched) .row-bg{fill:#d7eadc}
    :host([data-theme=light]) .write-dialog{background:var(--panel)}:host([data-theme=light]) .write-dialog p{color:var(--muted)}
    :host([data-theme=light]) .hash-button{background:#e1eee6;color:#226b43}:host([data-theme=light]) #detail h2{color:var(--text)}
  `;
  const sources=i18n.replaceAll('git-tree-viz.language','dsh.git-tree-viz.language')+'\n'+app.replaceAll('fill="#0b0e13"','fill="var(--bg)"').replaceAll("'#101316'","'var(--bg)'").replaceAll("'#dce2e5'","'var(--text)'").replaceAll("'#d5f0df'","'var(--text)'")
    .replace('if (state.loading || state.tagBusy) return;','if (state.loading || state.tagBusy) {pendingRepository=repo;return;}')
    .replace('if (state.tagBusy || state.exportBusy || state.accessBusy) return;','if (state.tagBusy || state.exportBusy || state.accessBusy) {pendingLocale=language;return;}')
    .replace('function updateAccessUI() {','function updateAccessUI() {if(pendingRepository!==null&&!state.loading&&!state.tagBusy){const next=pendingRepository;pendingRepository=null;loadGraph(next);}if(pendingLocale&&!state.tagBusy&&!state.exportBusy&&!state.accessBusy){const next=pendingLocale;pendingLocale=null;setLanguage(next);}')
    .replace(/loadGraph\(new URLSearchParams\(location.search\)\.get\("repo"\) \|\| ""\);/, 'if(bridge.repo) loadGraph(bridge.repo); else showEmpty(t("打开一段提交历史"),t("在上方输入本地 Git 仓库的路径。"));');
  return `export function mountGitTree(root,bridge){
    root.innerHTML='<style>'+${JSON.stringify(css)}+'</style><div id="git-tree-root">'+${JSON.stringify(body)}+'</div>';
    const container=root.getElementById('git-tree-root'),controller=new AbortController(),timers=new Set(),frames=new Set(),observers=new Set();let disposed=false,currentRepo=bridge.repo,pendingRepository=null,pendingLocale=null;
    const document={getElementById:id=>container.querySelector('#'+id),querySelectorAll:selector=>container.querySelectorAll(selector),body:container,documentElement:container,title:'',addEventListener:(name,listener,options)=>container.addEventListener(name,listener,{...(typeof options==='object'?options:{}),signal:controller.signal})};
    const location={search:''},history={replaceState(){}};
    const setTimeout=(fn,ms)=>{if(disposed)return 0;const id=globalThis.setTimeout(()=>{timers.delete(id);if(!disposed)fn();},ms);timers.add(id);return id;};
    const clearTimeout=id=>{globalThis.clearTimeout(id);timers.delete(id);};
    const requestAnimationFrame=fn=>{if(disposed)return 0;const id=globalThis.requestAnimationFrame(time=>{frames.delete(id);if(!disposed)fn(time);});frames.add(id);return id;};
    const ResizeObserver=class extends globalThis.ResizeObserver{constructor(callback){super(callback);observers.add(this);}};
    const fetch=async(url,options)=>{controller.signal.throwIfAborted();const parsed=new URL(url,'http://git-tree.invalid');const endpoint=parsed.pathname.replace(/^\\/api\\//,'');const payload=options?.body?JSON.parse(options.body):Object.fromEntries(parsed.searchParams);if(payload.parent!==undefined)payload.parent=Number(payload.parent);if(!payload.repo)payload.repo=currentRepo;const reply=await bridge.request(endpoint,payload,controller.signal);if(disposed&&endpoint==='write-access'&&payload.enabled&&reply.ok&&reply.value?.token){await bridge.request('write-access',{repo:payload.repo,token:reply.value.token,enabled:false});}return {ok:reply.ok,status:reply.ok?200:400,headers:{get:()=> 'application/json'},json:async()=>reply.ok?{ok:true,data:reply.value}:{ok:false,error:reply.error.message}};};
    ${sources}
    I18N.setLocale(bridge.locale.startsWith('zh')?'zh-CN':'en');setLanguage(I18N.locale);root.host.dataset.theme=bridge.theme;
    return {
      setLocale:locale=>{if(!disposed)setLanguage(locale.startsWith('zh')?'zh-CN':'en');},
      setTheme:theme=>{root.host.dataset.theme=theme;},
      setRepository:repo=>{if(!disposed&&repo!==currentRepo){currentRepo=repo;if(repo)loadGraph(repo);else{closeDetail();resetWriteAccess();}}},
      resetAccess:()=>{if(!disposed)resetWriteAccess();},
      dispose:async()=>{if(disposed)return;disposed=true;const token=state.writeToken,repo=state.data?.repo;state.writeToken='';controller.abort();for(const timer of timers)globalThis.clearTimeout(timer);for(const frame of frames)globalThis.cancelAnimationFrame(frame);for(const observer of observers)observer.disconnect();if(root.getElementById('git-tree-root')===container)root.replaceChildren();if(token&&repo){const reply=await bridge.request('write-access',{repo,token,enabled:false});if(!reply.ok)bridge.onError(reply.error);}}
    };
  }`;
}
