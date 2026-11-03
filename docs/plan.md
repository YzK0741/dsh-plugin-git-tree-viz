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

## 0.1.1: conversation tab and automatic workspace

- User requested Git history beside Chat/Trajectory/Context, following the opened workspace.
- Register `conversation.view` at order 30 instead of the global main/sidebar entries. Harness supplies the exact scoped `sessionId`; match it against the workspace catalog's session membership, without choosing an unrelated retained session or sole workspace.
- Remove the workspace selector; show the associated workspace and automatically mount its repository. Git resolves nested workspace paths to the root. Keep the existing manual path field as an explicit override within that mounted view.
- Remount on session/path changes to reset graph state and write grants, including when a session has no workspace.
- Regression verifies slot placement, multiple-workspace matching, live path changes and missing-workspace behavior. `npm run check`: typecheck/build and 10 tests pass.
- Installed 0.1.1 into the user's `web` profile and reloaded the local service. Real conversation smoke automatically resolved `deren` and loaded 1,774 commits without manual path entry; native narrow-layout overflow menu includes Git history alongside Trajectory/Context.

## 0.1.2: independent tree/detail scrolling

- Root cause: the conversation transcript's active view uses content-sized flex items. Without Harness's `data-conversation-composer-overlay` opt-in, the SVG's full 95,848px height expanded the plugin and scrolled the entire conversation, taking details out of view.
- Adopt the same bounded view contract as Harness's trajectory tab, remove the 640px minimum/outer scrolling, and keep tree and detail content as independent scrollers. Add scroll containment and composer clearance; compact short viewports keep a usable graph area.
- Watched the native-layout regression fail before the fix, then pass. Full validation: 10 tests; after CSS refinements, rebuilt and reran both frontend regressions successfully.
- Actual Harness verification: outer viewport and scroll height both 316px; tree viewport 224px with the full history inside it. At tree scrollTop 95,623px, outer scrollTop stayed 0 and detail top stayed 160.98px. Installed the final tarball into the daily web profile.
