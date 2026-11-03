/** Session-scoped conversation tab. Only React is a shared runtime external. */
import React,{useEffect,useRef,useSyncExternalStore} from 'react';
import {mountGitTree} from 'git-tree-ui';
import type {ClientPluginContext,PanelProps,ViewController} from './contracts.ts';
export const name='git-tree-viz-client';
export const inject=['slots','connection','locale','theme'];
const NS='gitTreeViz';
const en={panel:'Git history',workspace:'Workspace',automatic:'Following this conversation’s workspace',missing:'No workspace assigned to this conversation'};
const zh={panel:'Git 历史',workspace:'工作区',automatic:'自动跟随当前会话工作区',missing:'当前会话尚未关联工作区'};

/** Geometry-only sidebar icon; text belongs to Harness locale dictionaries. */
export function GitTreeIcon({size=20}:{size?:number}){
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M6 5v14M18 5v4c0 5-12 3-12 9"/><circle cx="6" cy="4" r="2"/><circle cx="18" cy="4" r="2"/><circle cx="6" cy="20" r="2"/></svg>;
}
/** Each conversation tab follows its own workspace and owns one disposable graph view. */
export function GitTreePanel(props:PanelProps){
  const locale=useSyncExternalStore(props.locale.subscribe.bind(props.locale),props.locale.getSnapshot.bind(props.locale));
  const theme=useSyncExternalStore(props.theme.subscribe.bind(props.theme),props.theme.getSnapshot.bind(props.theme));
  const generation=useSyncExternalStore(props.generation.subscribe.bind(props.generation),props.generation.getSnapshot.bind(props.generation));
  const workspaces=props.useWorkspaces(s=>s.items);
  const currentWorkspace=workspaces.find(row=>row.sessionIds.includes(props.sessionId));
  const repo=currentWorkspace?.path??'';
  const container=useRef<HTMLDivElement>(null),view=useRef<ViewController|null>(null);
  useEffect(()=>{
    if(!container.current)return;
    const root=container.current.shadowRoot??container.current.attachShadow({mode:'open'});
    const mounted=mountGitTree(root,{repo,locale:locale.active,theme:theme.active.colorScheme,request:props.request,onError:error=>console.error('[git-tree-viz]',error)});
    view.current=mounted;
    return ()=>{view.current=null;void mounted.dispose().catch(error=>console.error('[git-tree-viz] dispose failed',error));};
  },[props.request,props.sessionId,repo]);
  useEffect(()=>{view.current?.setLocale(locale.active);},[locale.active]);
  useEffect(()=>{view.current?.setTheme(theme.active.colorScheme);},[theme.active.colorScheme]);
  useEffect(()=>{view.current?.setRepository(repo);},[repo]);
  useEffect(()=>{view.current?.resetAccess();},[generation]);
  // Opt into Harness's bounded view area; the transcript layout grows with its content.
  return <div data-conversation-composer-overlay="" style={{height:'100%',width:'100%',flex:1,minHeight:0,minWidth:0,overflow:'hidden',display:'flex',flexDirection:'column'}}>
    <div style={{flexShrink:0,padding:'8px 14px',display:'flex',gap:10,alignItems:'center',flexWrap:'wrap',borderBottom:'1px solid var(--dsw-alias-border-l1,#30373c)',fontSize:12}}>
      <span>{props.t('workspace')} · {currentWorkspace?.title??props.t('missing')}</span>
      <span style={{opacity:.6,fontSize:11}}>{props.t('automatic')}</span>
    </div>
    <div ref={container} style={{flex:1,minHeight:0,minWidth:0,width:'100%',overflow:'hidden'}} tabIndex={-1}/>
  </div>;
}
/** Contribute alongside Chat/Trajectory/Context, with Harness supplying the scoped session id. */
export function apply(ctx:ClientPluginContext):void{
  ctx.effect(()=>ctx.locale.register(NS,{en,zh}),'git-tree-viz: native locale dictionaries');
  const request:PanelProps['request']=(endpoint,payload,signal)=>ctx.connection.rpc.call('/git-tree-viz',endpoint,payload,signal);
  const t=ctx.locale.bind(NS);
  const theme:PanelProps['theme']={getSnapshot:()=>ctx.theme.getTheme(),subscribe:callback=>ctx.on('theme/change',callback)};
  ctx.slots.inject('conversation.view',()=>ctx.slots.register({name:'conversation.view',id:'git-tree-viz',locale:NS,order:30,label:()=>t('panel'),inject:()=>({request,locale:ctx.locale,theme,generation:ctx.connection.generation})},GitTreePanel));
}
