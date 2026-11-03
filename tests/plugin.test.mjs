import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Context} from '@deepseek-ai/cordis';
import {createServer} from 'node:http';
import {apply,createDispatcher,CHANNEL} from '../lib/index.js';
test('Cordis effect owns channel registration and cleanup without any listening port',async()=>{
  const ctx=new Context();let handler,removed=false;
  ctx.reflect.provide('connection',{admit:()=>({peer:{principal:{kind:'owner'}}})});
  ctx.reflect.provide('webServer',{register(route){assert.equal(route.path,CHANNEL);handler=route.handler;return ()=>{removed=true;};}});
  const fork=ctx.plugin(apply);await new Promise(resolve=>setTimeout(resolve,20));
  assert.equal(typeof handler,'function');
  const server=createServer((req,res)=>void handler(req,res));await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  try{
    const malformed=await fetch('http://127.0.0.1:'+server.address().port+CHANNEL+'/graph',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});
    assert.equal(malformed.status,400);
    const valid=await fetch('http://127.0.0.1:'+server.address().port+CHANNEL+'/graph',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'client-request',rpcId:'test',method:'graph',payload:{repo:42}})});
    assert.equal(valid.status,200);assert.equal((await valid.json()).result.ok,false);
  }finally{await new Promise(resolve=>server.close(resolve));await fork.dispose();}
  assert.equal(removed,true);
});
test('wire validation rejects malformed requests before invoking Git',async()=>{
  const engine={graph(){throw new Error('must not reach Git');}};const dispatch=createDispatcher(engine);const signal=new AbortController().signal;const peer={principal:{kind:'owner'}};
  for(const value of [null,[],false,{repo:42}]){const result=await dispatch('graph',value,signal,peer);assert.equal(result.ok,false);assert.doesNotMatch(result.error.message,/must not reach/);}
});
test('owner identities remain stable per peer and cannot share write grants',async()=>{
  const ownerIds=[];const engine={writeAccess:async(repo,enabled,token,owner)=>{ownerIds.push(owner);return {token:'grant'};}};
  const dispatch=createDispatcher(engine);const signal=new AbortController().signal;const a={principal:{kind:'owner'}},b={principal:{kind:'owner'}};
  await dispatch('write-access',{repo:'test',enabled:true},signal,a);await dispatch('write-access',{repo:'test',enabled:false,token:'grant'},signal,a);await dispatch('write-access',{repo:'test',enabled:true},signal,b);
  assert.equal(ownerIds[0],ownerIds[1]);assert.notEqual(ownerIds[0],ownerIds[2]);
});
