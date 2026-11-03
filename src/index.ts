/** Cordis Host contribution using the authenticated Connection channel extension point. */
import type {Context} from '@deepseek-ai/cordis';
import {randomUUID} from 'node:crypto';
import type {IncomingMessage,ServerResponse} from 'node:http';
import {GitEngine,resolveConfig} from './engine.ts';
import type {GitTreeConfig} from './types.ts';

/** Connection subset consumed by the out-of-tree plugin; structurally matches HostConnectionRpc. */
export interface OwnerPeer {readonly principal:{readonly kind:string}}
/** Harness-neutral result carried by Connection after its trust/authentication checks. */
export type RpcResult={ok:true;value:unknown}|{ok:false;error:{code:string;message:string;details:object}};
/** Host services required by this third-party plugin. */
export interface HostPluginContext extends Context {
  connection:{admit(request:{headers:Headers}):{peer:OwnerPeer}|{rejection:401|403}};
  webServer:{register(route:{kind:'prefix';path:string;handler:(request:IncomingMessage,response:ServerResponse)=>Promise<void>}):()=>void};
}
export const name='git-tree-viz';
export const inject=['connection','webServer'];
export const CHANNEL='/git-tree-viz';
const MUTATIONS=new Set(['export','open-folder','write-access','tags/create','tags/undo-all']);

function object(value:unknown):Record<string,unknown>{if(!value||typeof value!=='object'||Array.isArray(value))throw new Error('请求格式无效');return value as Record<string,unknown>;}
function text(value:unknown,key:string,fallback?:string):string{if(value===undefined&&fallback!==undefined)return fallback;if(typeof value!=='string')throw new Error(`Invalid ${key}: expected a string`);return value;}
function bool(value:unknown,key:string,fallback=false):boolean{if(value===undefined)return fallback;if(typeof value!=='boolean')throw new Error(`Invalid ${key}: expected a boolean`);return value;}
function integer(value:unknown,key:string,fallback=0):number{if(value===undefined)return fallback;if(typeof value!=='number'||!Number.isSafeInteger(value))throw new Error(`Invalid ${key}: expected an integer`);return value;}

/** Validate wire requests and route only explicit owner-Peer UI operations. */
export function createDispatcher(engine:GitEngine){
  const owners=new WeakMap<OwnerPeer,string>();
  return async(endpoint:string,payload:unknown,signal:AbortSignal,peer:OwnerPeer):Promise<RpcResult>=>{
    if(peer.principal.kind!=='owner')return {ok:false,error:{code:'git-tree/forbidden',message:'Git Tree is available only to the authenticated owner.',details:{}}};
    let owner=owners.get(peer);if(!owner){owner=randomUUID();owners.set(peer,owner);}
    try{
      signal.throwIfAborted();const input=object(payload);const repo=endpoint==='open-folder'?'':text(input.repo,'repo');
      let value:unknown;
      switch(endpoint){
        case 'graph':value=await engine.graph(repo,signal);break;
        case 'metrics':value=await engine.metrics(repo,signal);break;
        case 'commit':value=await engine.detail(repo,text(input.hash,'hash'),integer(input.parent,'parent'),text(input.path,'path',''),signal);break;
        case 'export-info':value=await engine.exportInfo(repo,text(input.hash,'hash'),signal);break;
        case 'export':value=await engine.export(repo,text(input.hash,'hash'),text(input.destination,'destination'),bool(input.include_git,'include_git'),text(input.branch,'branch',''));break;
        case 'open-folder':value=await engine.openExport(text(input.path,'path'));break;
        case 'write-access':value=await engine.writeAccess(repo,bool(input.enabled,'enabled'),text(input.token,'token',''),owner);break;
        case 'tags/create':value=await engine.createTag(repo,text(input.hash,'hash'),text(input.name,'name'),text(input.token,'token',''),owner);break;
        case 'tags/undo-all':value=await engine.undoTags(repo,text(input.token,'token',''),owner);break;
        default:throw new Error('接口不存在');
      }
      return {ok:true,value};
    }catch(error){return {ok:false,error:{code:signal.aborted?'git-tree/cancelled':'git-tree/operation-failed',message:error instanceof Error?error.message:String(error),details:{endpoint}}};}
  };
}

/** Register one channel and await accepted writes during plugin removal. */
export function apply(ctx:HostPluginContext,input:Partial<GitTreeConfig>={}):void{
  const engine=new GitEngine(resolveConfig(input));const dispatch=createDispatcher(engine);const writes=new Set<Promise<RpcResult>>();let active=true;
  ctx.effect(()=>{
    const invoke=(endpoint:string,payload:unknown,signal:AbortSignal,peer:OwnerPeer)=>{
      if(!active)return Promise.resolve({ok:false,error:{code:'git-tree/stopped',message:'Git Tree plugin is stopped',details:{}}});
      const operation=dispatch(endpoint,payload,signal,peer);
      if(MUTATIONS.has(endpoint)){writes.add(operation);void operation.finally(()=>writes.delete(operation));}
      return operation;
    };
    // Retain Connection's admission and public RPC envelopes, while registering
    // the physical route directly in this plugin's injected WebServer context.
    const respond=async(request:Request)=>{
      const admitted=ctx.connection.admit({headers:request.headers});
      if('rejection' in admitted)return new Response('unauthorized',{status:admitted.rejection});
      if(admitted.peer.principal.kind!=='owner')return new Response('forbidden',{status:403});
      if(request.method!=='POST'||request.headers.get('content-type')?.split(';')[0].trim()!=='application/json')return new Response('JSON POST required',{status:400});
      let message:Record<string,unknown>;
      try{
        const reader=request.body?.getReader();if(!reader)throw new Error('Empty request');const chunks:Uint8Array[]=[];let size=0;
        while(true){const next=await reader.read();if(next.done)break;size+=next.value.length;if(size>16384){await reader.cancel();throw new Error('Request too large');}chunks.push(next.value);}
        message=object(JSON.parse(Buffer.concat(chunks).toString('utf8')));
        if(message.type!=='client-request'||typeof message.rpcId!=='string'||!message.rpcId||typeof message.method!=='string'||!/^\/[A-Za-z0-9_$.-]+(?:\/[A-Za-z0-9_$.-]+)*$/.test('/'+message.method)||new URL(request.url).pathname!==CHANNEL+'/'+message.method)throw new Error('Invalid RPC envelope');
      }catch(error){return new Response(error instanceof Error?error.message:String(error),{status:400});}
      const result=await invoke(message.method as string,message.payload,request.signal,admitted.peer);
      return Response.json({type:'server-response',rpcId:message.rpcId,result});
    };
    const unregister=ctx.webServer.register({kind:'prefix',path:CHANNEL,handler:async(req,res)=>{
      const abort=new AbortController();const cancel=()=>abort.abort();
      req.once('aborted',cancel);res.once('close',cancel);
      try{
        const headers=new Headers();for(const [key,value] of Object.entries(req.headers))if(value!==undefined)headers.set(key,Array.isArray(value)?value.join(', '):value);
        const admission=ctx.connection.admit({headers});
        if('rejection' in admission){res.writeHead(admission.rejection);res.end('unauthorized');return;}
        const chunks:Buffer[]=[];let size=0;
        for await(const chunk of req){size+=chunk.length;if(size>16384){res.writeHead(413);res.end('Request too large');return;}chunks.push(Buffer.from(chunk));}
        const method=req.method??'GET';
        const request=new Request('http://localhost'+req.url,{method,headers,signal:abort.signal,...(method==='GET'||method==='HEAD'?{}:{body:Buffer.concat(chunks)})});
        const response=await respond(request);
        res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
      }catch(error){if(!res.headersSent)res.writeHead(400);res.end(error instanceof Error?error.message:'Invalid request');}
      finally{req.off('aborted',cancel);res.off('close',cancel);}
    }});
    return async()=>{active=false;await unregister();await Promise.allSettled([...writes]);await engine.dispose();};
  },'git-tree-viz: authenticated channel and Git lifecycle');
}
