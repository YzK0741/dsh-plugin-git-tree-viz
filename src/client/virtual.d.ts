declare module 'git-tree-ui' {
  export function mountGitTree(root:ShadowRoot,bridge:import('./contracts.ts').ViewBridge):import('./contracts.ts').ViewController;
}
