/** Native sidebar/main-panel contribution. Only React is a shared runtime external. */
import React,{useEffect,useRef,useState,useSyncExternalStore} from 'react';
import {mountGitTree} from 'git-tree-ui';
import type {ClientPluginContext,PanelProps,ViewController} from './contracts.ts';
export const name='git-tree-viz-client';
export const inject=['slots','connection','locale','theme'];
const NS='gitTreeViz';
const en={panel:'Git history',workspace:'Workspace',choose:'Choose a workspace',manual:'Or enter a repository path below'};
const zh={panel:'Git 历史',workspace:'工作区',choose:'选择工作区',manual:'也可在下方输入仓库路径'};

/** Geometry-only sidebar icon; text belongs to Harness locale dictionaries. */
export function GitTreeIcon({size=20}:{size?:number}){
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M6 5v14M18 5v4c0 5-12 3-12 9"/><circle cx="6" cy="4" r="2"/><circle cx="18" cy="4" r="2"/><circle cx="6" cy="20" r="2"/></svg>;
}
/** Native panel owns workspace choice, service subscriptions and one disposable graph view. */
export function GitTreePanel(props:PanelProps){
  const locale=useSyncExternalStore(props.locale.subscribe.bind(props.locale),props.locale.getSnapshot.bind(props.locale));
  const theme=useSyncExternalStore(props.theme.subscribe.bind(props.theme),props.theme.getSnapshot.bind(props.theme));
  const generation=useSyncExternalStore(props.generation.subscribe.bind(props.generation),props.generation.getSnapshot.bind(props.generation));
  const workspaces=props.useWorkspaces(s=>s.items);
  const currentSession=props.useSessions(s=>Object.values(s.byId).find(row=>(row.retainedBy?.mainView||0)>0)?.id);
  const currentWorkspace=workspaces.find(row=>currentSession&&row.sessionIds.includes(currentSession));
  const [picked,setPicked]=useState<string|null>(null);
  const repo=picked??currentWorkspace?.path??(workspaces.length===1?workspaces[0].path:'');
  const container=useRef<HTMLDivElement>(null),view=useRef<ViewController|null>(null);
  useEffect(()=>{
    if(!container.current)return;
    const root=container.current.shadowRoot??container.current.attachShadow({mode:'open'});
    const mounted=mountGitTree(root,{repo,locale:locale.active,theme:theme.active.colorScheme,request:props.request,onError:error=>console.error('[git-tree-viz]',error)});
    view.current=mounted;
    return ()=>{view.current=null;void mounted.dispose().catch(error=>console.error('[git-tree-viz] dispose failed',error));};
  },[props.request]);
  useEffect(()=>{view.current?.setLocale(locale.active);},[locale.active]);
  useEffect(()=>{view.current?.setTheme(theme.active.colorScheme);},[theme.active.colorScheme]);
  useEffect(()=>{view.current?.setRepository(repo);},[repo]);
  useEffect(()=>{view.current?.resetAccess();},[generation]);
  return <div style={{height:'100%',minHeight:0,overflow:'auto',display:'flex',flexDirection:'column'}}>
    <div style={{padding:'8px 14px',display:'flex',gap:10,alignItems:'center',flexWrap:'wrap',borderBottom:'1px solid var(--dsw-alias-border-l1,#30373c)',fontSize:12}}>
      <label style={{display:'flex',gap:8,alignItems:'center'}}>{props.t('workspace')}<select aria-label={props.t('workspace')} value={repo} onChange={event=>setPicked(event.target.value)} style={{padding:'4px 8px',background:'transparent',color:'inherit',maxWidth:420}}><option value="">{props.t('choose')}</option>{workspaces.map(row=><option key={row.workspaceId} value={row.path}>{row.title}</option>)}</select></label>
      <span style={{opacity:.6,fontSize:11}}>{props.t('manual')}</span>
    </div>
    <div ref={container} style={{flex:1,minHeight:640,minWidth:360,width:'100%'}} tabIndex={-1}/>
  </div>;
}
/** Register reversible native navigation and keep runtime services out of the panel's implementation. */
export function apply(ctx:ClientPluginContext):void{
  ctx.effect(()=>ctx.locale.register(NS,{en,zh}),'git-tree-viz: native locale dictionaries');
  const request:PanelProps['request']=(endpoint,payload,signal)=>ctx.connection.rpc.call('/git-tree-viz',endpoint,payload,signal);
  const t=ctx.locale.bind(NS);
  const theme:PanelProps['theme']={getSnapshot:()=>ctx.theme.getTheme(),subscribe:callback=>ctx.on('theme/change',callback)};
  ctx.slots.inject('main',()=>ctx.slots.register({name:'main',key:'git-tree-viz',locale:NS,inject:()=>({request,locale:ctx.locale,theme,generation:ctx.connection.generation})},GitTreePanel));
  ctx.slots.inject('sidebar.panellist',()=>ctx.slots.register({name:'sidebar.panellist',id:'git-tree-viz',locale:NS,order:35,label:()=>t('panel')},GitTreeIcon));
}
