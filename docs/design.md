# Native Git Tree plugin

The user selected an independent MIT-licensed native DeepSeek Harness plugin, retaining the existing Git Tree browser and Git operations. Local installation and tests precede GitHub/npm publication. Publication mechanics will be settled after testing.

## Approach

A Cordis Host contribution registers an authenticated Connection RPC channel. A Client contribution registers a sidebar entry and native main panel. The proven vanilla SVG interface is mounted inside a plugin-owned ShadowRoot through a React lifecycle adapter, without an iframe, Python process, listening port, or global stylesheet. Node implements Git reads, diffs, metrics, safe exports, and local tag transactions.

The alternative of embedding the Python web server was rejected by the user in favor of a native plugin. A full UI rewrite adds churn without improving the existing graph interactions; isolated DOM mounting retains those interactions while integrating host lifecycle and services.

## Behavior

- Graph layout, six sorts, type filters, search, parent/child navigation, commit details and file diffs remain available.
- Initial repository follows the selected Session workspace when available, otherwise an explicit workspace choice. Repository selection remains visible.
- Host locale and theme update the panel. No host URL, document title, or global DOM handlers are modified.
- Source repositories default to read-only. Explicit warning confirmation grants a repository- and owner-Peer-scoped write capability. Only software-owned tags can be batch-reverted; moved or manual tags are preserved.
- Exports use isolated staging, preserve source HEAD/worktree, reject nonempty destinations and never execute source checkout hooks. Git exports copy independent history.
- Disabling/unmounting removes registrations, subscriptions and view observers, aborts pending reads, revokes write capabilities and cleans failed export staging. Accepted mutations settle to a known result before teardown completes.

## Distribution

The npm/Git package includes prebuilt Host and closure-factory Client artifacts, a Cordis bundle patch, bilingual metadata, MIT license and install documentation. No install/prepare script is required. Compatibility is tested against the local Harness version and explicitly bounded by package metadata.

## Validation

Real temporary Git repositories test history, binary/Unicode files, root/merge diffs, metrics, snapshots, independent clones and ownership transactions. Cordis/Connection integration tests cover owner authorization, malformed payloads, disposal and permission isolation. Client regression tests retain existing workflows; native panel tests check locale/theme, workspace binding, no global side effects and remounting. A clean package installation into an isolated Harness profile is required before calling the plugin ready for publication.
