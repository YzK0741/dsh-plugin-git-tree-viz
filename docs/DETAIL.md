# Git history

Explore a local workspace's Git history inside Harness. Browse branch graphs and file diffs, search and filter commit types, compare change sizes, export historical versions, and create local tags after explicitly enabling repository writes.

Open **Git history** in the sidebar, choose a workspace or enter a repository path, then select a commit. Language and theme follow Harness. **Undo app tags** removes unchanged tags created by this plugin; manual and subsequently modified tags are preserved. Tags must be pushed manually.

Requires Harness 0.2.2-alpha.2-compatible native Client/Connection APIs, Node.js 24.9+ and system Git. Exports do not download submodule or LFS contents.
