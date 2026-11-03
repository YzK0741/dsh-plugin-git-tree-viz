# Native Git Tree implementation plan

**Goal:** Deliver a locally verified, independently installable Cordis plugin with the existing Git Tree features.

**Architecture:** Node Git engine, authenticated Connection RPC adapter, lifecycle-owned React/ShadowRoot panel and bundled native Client factory.

**Spec:** [design.md](design.md)

- [x] Create package metadata, build pipeline, MIT license and isolated local test profile.
- [x] Write failing Git engine tests, then port reads, diffs, metrics, tags and staged exports to Node.
- [x] Add owner-only RPC registration with parser validation, cancellation and lifecycle cleanup; test against Cordis/Connection.
- [x] Mount the existing UI as a native panel, subscribe to locale/theme and bind repository selection to workspace context.
- [x] Run frontend regressions, package/type/build checks, clean install and real Harness UI smoke tests.
- [x] Review final changes and resolve the review's two lifecycle findings.
- [ ] Publish GitHub/npm after the agreed publication procedure (user deferred this step).

## Decisions and evidence

- The original standalone repository remains unchanged.
- Ruling: register a raw WebServer handler through the plugin's injected context and retain Connection admission and RPC envelopes. The convenience RPC registrar failed service injection in this Harness checkout, and resource routes only support GET/HEAD. No extra server or core changes are required.
- Reuse the SVG UI under a lifecycle adapter; repository content remains untranslated and Host/Client data stays on the existing authenticated carrier.
- Theme snapshots use `getTheme()` and the `theme/change` event; the service itself is not an external-store observable.
- Final `npm run check`: typecheck, bundle/declarations and 10/10 tests pass on Windows with Node 24 and real Git repositories.
- Native Harness 0.2.2-alpha.2 smoke: package installed from a tarball in isolated `git-tree-test` profile; sidebar/panel, graph, commit diff, warning, create/undo tag, edit-count sort and type filtering verified.
- Native UI exported the selected commit into an independent Git repository on `review/native`; disk verification matched the selected hash and confirmed the test tag was removed.
- Fresh review found delayed disposal erasing a replacement view and pending graph cancellation querying cleared DOM. Both fixed and regression-tested; follow-up review confirmed resolution.
- Small native panels scroll with a minimum 360px graph width and 640px content height, preventing toolbar wrapping from collapsing the graph.
