# Git history

Explore a local workspace's Git history inside Harness. Browse branch graphs and file diffs, search and filter commit types, compare change sizes, export historical versions, and create local tags after explicitly enabling repository writes.

Open **Git history** beside Chat, Trajectory and Context in a conversation. The repository automatically follows that conversation's workspace; a workspace inside a Git subdirectory resolves to the repository root. A manual path is also available. Language and theme follow Harness. **Undo app tags** removes unchanged tags created by this plugin; manual and subsequently modified tags are preserved. Tags must be pushed manually.

Requires Harness 0.2.2-alpha.2-compatible native Client/Connection APIs, Node.js 24.9+ and system Git. Exports do not download submodule or LFS contents.
