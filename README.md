# Git Tree for DeepSeek Harness

Native Git history explorer for DeepSeek Harness. MIT licensed. No Python, extra server, iframe, or standalone port.

## Features

- Interactive SVG branch graph and commit details, with parent/child navigation and file diffs.
- Chinese/English UI following the Harness language; light/dark presentation follows its theme.
- Conversation tab alongside Chat, Trajectory and Context, automatically following that conversation's workspace and repository. Manual repository paths remain available.
- Type filters, search, time/line-change/file-count sorting in both directions; non-time rankings omit graph edges.
- Export any committed version as a file snapshot or independent Git repository, optionally on a new branch.
- Read-only by default. Explicit warning confirmation enables local tags and one-click rollback of all unchanged app-created tags. Tags must be pushed manually.
- Plugin-owned observers, subscriptions and RPC handlers are removed on unload. The view never changes the Harness URL, global document title or stylesheet.

## Compatibility

This first version targets the DeepSeek Harness **0.2.2-alpha.2** native Client/Connection APIs and Node.js **24.9+**. Harness APIs are pre-stable; earlier published component versions are not assumed compatible. A recent system Git is required. The package's `engines.dsh` enforces the supported range.

## Install

Install into the profile you actually use:

```sh
dsh plugin --profile web add dsh-plugin-git-tree-viz
```

For a local package, build and pack, then install the resulting tarball:

```sh
npm ci --ignore-scripts --legacy-peer-deps
npm run check
npm pack --ignore-scripts
dsh plugin --profile web add /absolute/path/dsh-plugin-git-tree-viz-0.1.2.tgz
```

Open a conversation and select **Git history** alongside Chat, Trajectory and Context. Its repository follows that conversation's workspace automatically, including workspaces inside a Git subdirectory. Changing the conversation or workspace resets the graph and write access. If needed, enter another repository path manually. The view keeps graph interactions inside its own ShadowRoot and uses the existing authenticated Connection carrier for all Git operations.

The package includes its built `lib/` artifacts; installing a release or Git checkout does not need an install/prepare script. Development dependencies are not runtime dependencies.

## Safety and semantics

Only the authenticated owner Peer can invoke the plugin channel. Source writes require a repository- and Peer-specific capability issued after the UI warning. The view returns to read-only on repository changes, remounts and Host generation changes. A read-only source can still be exported to another directory.

Tag and app-ownership refs are created atomically. **Undo app tags** removes only unchanged tags created by this app in the current repository, including earlier plugin sessions. Manual tags and subsequently moved tags are preserved. Ownership lives under `refs/git-tree-viz/tags/*`, which is excluded from the visible history. These are local operations; remote tags require manual pushes.

Exports require an absent or empty destination outside the source repository, with an existing parent directory. Output is built in a sibling staging directory and moved into place only on success. Snapshots read committed object bytes, including `export-ignore` files, and exclude dirty/untracked files. Git copies do not borrow objects through hardlinks or alternates and do not execute checkout hooks. Submodules are left empty; LFS pointer files are retained without downloading objects. External snapshot symlinks are rejected; Windows may represent internal links as target text.

Accepted mutations settle before Host teardown; ordinary reads are cancellable. An interrupted or failed export removes only its own staging directory and does not overwrite a nonempty destination.

## Development

```sh
npm ci --ignore-scripts --legacy-peer-deps
npm run check
```

Tests use temporary real Git repositories and a DOM environment; no model API key is required. `src/engine.ts` owns Node operations, `src/index.ts` the authenticated Cordis channel, `src/client/` native navigation/lifecycle, and `src/ui/` the maintained interface derived from [git-tree-viz](https://github.com/YzK0741/git-tree-viz). The build compiles that interface into a scoped function; it does not evaluate source strings at runtime.

Deployment settings in `cordis.patch.yml`: `gitTimeoutMs` (120000), `maxOutputBytes` (134217728) and `maxPatchCharacters` (200000). Invalid settings fail at activation.

## Known limitations

- Local repository operations only; no GitHub API or automatic push.
- Whole-history metadata is read before layout; only nearby graph rows are drawn.
- Source worktree changes are not shown, and submodule/LFS downloads are not performed.
- Native Client compatibility must be checked for every supported Harness API release.

## License

[MIT](LICENSE) © 2026 YzK0741. The SVG interface derives from the same author's MIT-licensed [standalone Git Tree](https://github.com/YzK0741/git-tree-viz).
