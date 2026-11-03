import {build} from 'esbuild';
import {mkdir,writeFile} from 'node:fs/promises';
import {uiModule} from './ui-module.mjs';
import {execFileSync} from 'node:child_process';
await mkdir('lib',{recursive:true});
await build({entryPoints:['src/engine.ts','src/index.ts'],outdir:'lib',bundle:true,format:'esm',platform:'node',target:'node24',packages:'external'});
const client=await build({entryPoints:['src/client/index.tsx'],bundle:true,write:false,format:'cjs',platform:'browser',target:'es2022',external:['react'],plugins:[{name:'git-tree-native-view',setup(build){build.onResolve({filter:/^git-tree-ui$/},()=>({path:'git-tree-ui',namespace:'native-view'}));build.onLoad({filter:/.*/,namespace:'native-view'},async()=>({contents:await uiModule(),loader:'js'}));}}]});
await writeFile('lib/client.js','window.__ModuleLoader__.load({id:"dsh-plugin-git-tree-viz",factory:function(require){var module={exports:{}};var exports=module.exports;\n'+client.outputFiles[0].text+'\nreturn module.exports;}});\n');
execFileSync(process.execPath,['node_modules/typescript/bin/tsc','--emitDeclarationOnly'],{stdio:'inherit'});
