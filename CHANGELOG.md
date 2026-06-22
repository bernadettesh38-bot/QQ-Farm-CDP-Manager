# Changelog

## 2026-06-22 - 1.9.8-hotfix3

### Fixed

- Reworked the desktop shell layout after screenshot/OCR review: title, quick links, window controls, version, public-benefit badge, account identity, runtime selector, and status cards now have separate scan-friendly regions.
- Replaced mojibake text in the desktop shell first viewport and renderer status updates with clean UTF-8 Chinese labels.
- Changed desktop status cards to a two-column compact layout with bounded text so version, theme, account, service status, and task status no longer overlap.

## 2026-06-22 - 1.9.8-hotfix2

### Fixed

- Reverted the long-idle disconnect prompt auto-click method and removed the public `gameCtl.clickIdleDisconnectPrompt` runtime/RPC entry.
- Replaced popup auto-clicking with a configurable `idleDisconnectWatch` keepalive interaction that sends a lightweight manual-style click every 150 minutes.
- The keepalive path records detection and failures but does not click the "next time" disconnect prompt after it is already visible.
- Kept the light/dark theme persistence merge checks in the release gate so Web automation and config saves cannot overwrite the selected theme.

## 2026-06-22 - 1.9.8-hotfix

### Fixed

- Changed the long-idle disconnect popup watcher into an automatic handler.
- The runtime now detects the prompt that says the farm connection was disconnected after long inactivity and automatically clicks the confirm button, matching the existing other-place login reconnect behavior.
- `idleDisconnectWatch` is now enabled by default and can still be disabled from the control page.
- Added release-gate checks for the explicit `gameCtl.clickIdleDisconnectPrompt` runtime method and QQ RPC allow-list entry.

## 2026-06-22 - 1.9.8

### Added

- Added an idle-disconnect popup watcher for the long-idle prompt that says the farm connection was disconnected and asks the user to log in again.
- Added persistent `idleDisconnectWatch` configuration and runtime sync for both CDP/WX and QQ host paths.
- Added release-gate coverage for idle-disconnect watcher exports, config persistence, QQ RPC allow-listing, and web UI settings.

### Fixed

- Improved the desktop shell layout so version, public-benefit status, quick links, theme/settings/window actions, account identity, and status cards no longer compete for the same titlebar space.
- Preserved all v1.9.8-b LAN mobile token fixes, v1.9.8-hotfix desktop/mobile fixes, and v1.9.8-test friend mischief safety rules in the formal protected release.

## 2026-06-19 - 1.9.8-b

### Fixed

- Fixed LAN mobile-control token access so a tokenized `/mobile.html` URL also carries the token into same-origin static resources, API calls, and WebSocket connections.
- Allowed enabled LAN mobile control with a valid token to pass access checks even when the client address is reported in an unexpected non-local or IPv6 form.
- Kept tokenless non-local access rejected and preserved random-token protection.

## 2026-06-18 - 1.9.8-hotfix

### Fixed

- Fixed the desktop shell Settings button after LAN mobile control changes by opening the local settings page through `127.0.0.1` even when the gateway listens on `0.0.0.0`.
- Reduced desktop shell crowding by increasing the shell height, allowing vertical scrolling, and moving secondary status cards behind a collapsed "More status" section.
- Changed `/mobile.html` to serve the full web control page with mobile-adaptive CSS and token-aware fetch handling instead of a reduced partial page.
- Implemented the two-step friend mischief runtime action: click a friend land tile first, wait for the grass or bug component, then click that component before counting the action.
- Rebuilt `button-lite.js` so protected packages include the friend mischief runtime method.
- Re-verified light/dark theme persistence through the user settings persistence test.

## 2026-06-18 - 1.9.8-test

### Added

- Added a low-priority `friend_mischief` scheduler task for friend-farm grass and bug actions after entering a friend's farm.
- Added a shared friend mischief daily ledger stored under stable user data, with grass and bug actions sharing one hard-capped 100-action daily limit.
- Added friend mischief diagnostics in `friend-mischief-trace.jsonl` with ledger, candidate, enter-farm, action, and counter-result reason codes.
- Added disabled-by-default LAN mobile control settings with random token protection, mobile config update API, and mobile page entry.

### Changed

- Added friend mischief controls to the web dashboard and kept the task lower priority than own-farm work, normal help, guard-dog help, and friend stealing.
- LAN mobile access remains local-only unless explicitly enabled; non-local LAN clients must pass token validation when required.
- Added release-gate tests for friend mischief config, friend mischief ledger persistence, and LAN mobile control safety.

## 2026-06-18 - 1.9.7-hotfix

### Fixed

- Added a persistent user-facing QQ host mode setting.
- Users can now switch between automatic QQ bootstrap and manual QQ host attach mode without using PowerShell environment variables.
- Manual QQ host mode is now saved and restored after restart.
- Fixed theme mode persistence.
- Fixed an issue where enabling Web automation could unexpectedly switch between light and dark mode.
- Fixed an issue where saving settings could overwrite the selected theme mode.
- Improved user settings merge behavior to avoid unrelated settings being reset.

## 2026-06-18 - 1.9.7

- Added QQ manual-host fallback mode (`--qq-manual-host` or `FARM_QQ_HOST_MODE=manual`) so affected protected users can open QQ Farm manually while the app waits, attaches to the detected host, and suppresses automatic reloads.
- Added QQ restart-source diagnostics for bootstrap, process guard, manual-host suppression, WebSocket state, GameCtl readiness, runtime-context readiness, and health timeout state.
- Fixed normal friend-help limit handling so stale state from the old 100-help boundary is recalculated after the configured limit changes, including 100 to 1000.
- Added normal friend-help diagnostics for configured/effective limit, counter state, candidate creation, schedule-only no-ops, dispatch, real action execution, and skip reasons.
- Prioritized own-farm plant-after-harvest follow-up work and added harvest-to-plant delay diagnostics with reason codes for runtime readiness, state refresh, seed strategy, no seed, scheduler queue, and cooldown.
- Wired v1.9.7 regression checks into the dual release gate alongside protected desktop diagnostics, guard-dog, planting, and protected-runtime checks.

## 2026-06-18 - 1.9.6-PUBLIC-20260618-003

- Prepared the final v1.9.6 protected release candidate from build `PUBLIC-20260618-003`; older build ids `20260617-007`, `20260618-001`, and `20260618-002` must not be published for this release.
- Fixed protected desktop status flapping by preserving process-aware health state: `processAlive`, `httpReady`, `gatewayReady`, `schedulerReady`, and `runtimeReady` are reported separately, with a 5000 ms health timeout and short stale-health grace.
- Added desktop JSONL diagnostics for protected status, QQ runtime, scheduler, own-farm work, friend stealing, normal help, and guard-dog help so first-action and no-op reasons can be verified after packaging.
- Kept the signed protected package checks as release blockers: manifest verification, whitelist checks, sensitive-data scan, source-leak scan, tamper tests, protected runtime size checks, and clean UTF-8 documentation scan.
- Verified the protected QQ runtime reached `qq_ws_connected`, `qq_runtime_context_ready`, and `runtime_synced`; own-farm work and friend-help flows record real-action or explicit no-op reason codes.

## 2026-06-17 - 1.9.6

- Fixed the updated QQ one-click work tool layout: weed and pest work now fall back to the active visible work button when the old fixed indexes are not present.
- Own-farm work now verifies real count reduction and no longer reports a protected runtime task as successful when weed or pest counts do not change.
- Friend help now retries One-Click Farming first and then runs all legacy help actions, covering watering, weed removal, and pest removal in normal, steal-follow, and guard-dog help flows.
- Added QQ WebSocket grace handling so bootstrap and process guard do not treat short reconnecting, just-disconnected, or just-ready states as immediate host failures.
- Added four-tile crop follow-up stealing after one-click harvest, even when the summary collect count already reached zero.
- Added regression coverage for protected lite one-click work fallback, own-farm full work execution, QQ WebSocket reconnect grace, friend-help legacy coverage, and four-tile post-one-click stealing.

## 2026-06-17 - 1.9.5

- Added a shared friend-help executor that detects the new One-Click Farming entry before falling back to legacy water, weed, and pest help actions.
- Extended friend patrol, steal-follow help, normal help, and guard-dog reward help to use the same help executor and detailed friend-help logs.
- Changed QQ startup to limited launch/reload attempts with degraded waiting and desktop diagnostic log export on final failure or PowerShell timeout.
- Fixed backpack-first planting so an empty backpack falls back to the highest-level available shop seed and continues planting after purchase.
- Added purple land recognition to runtime land detection, dashboard display, and auto-fertilizer land-type filtering.

## 2026-06-17 - 1.9.4

- Replaced the public README, changelog, and GitHub release notes with clean English text to remove corrupted Chinese text from the public repository.
- Kept the protected release flow unchanged: source artifacts remain private, and only protected public artifacts are published.
- Kept the 1.9.3 desktop minimize button and guard-dog scheduler improvements in the public protected package.

## 2026-06-17 - 1.9.3

- Added a minimize button to the desktop shell so the window can be hidden to the background without stopping the service.
- Added guard-dog reward wait/probe logic after entering a friend's farm to reduce cases where the app arrives and returns without action.
- Added clearer scheduler protocol fields for runnable candidates, readiness, cooldowns, skipped reasons, and confirmed real action progress.
- Updated public documentation to describe changes without exposing friend identifiers, test sample IDs, or internal runtime IDs.

## 2026-06-16 - 1.9.2hotfix

- Improved guard-dog and friend-help scheduling so empty or failed reward routes do not immediately spin every second.
- Added idle backoff and wake-up behavior for guard-dog reward queues.
- Reduced noisy QQ host bootstrap status refreshes when the runtime bundle is already current.

## 2026-06-16 - 1.9.2

- Improved QQ host reconnect and recovery handling.
- Fixed guard-dog reward reporting so success and failure states better reflect real runtime outcomes.
- Improved friend-steal routing with one-click harvest first and safer fallback paths for special cases.
- Kept public documentation at a high level without exposing private identifiers.

## 2026-06-16 - 1.9

- Improved friend-patrol sensitivity when the friend list already contains stealable or helpable state.
- Improved scheduler priority so due friend-steal work is not starved by helper tasks.
- Strengthened friend-context confirmation before acting on a farm.
- Improved WeChat/CDP, QQ/Lite, and protected-runtime paths to reduce repeated scans and repeated CDP calls.
- Updated desktop and web branding assets.

## 2026-06-15 - 1.8.9

- Improved friend switching, context recovery, and background connection stability.
- Improved special-crop detection and protected build performance.
- Added clearer platform switching status and configuration hints.
- Changed reward-help handling to prefer cached and manually scanned data.

## 2026-06-14 - 1.8.8

- Combined fixes for protected trust, friend-context confirmation, runtime batch stealing, and preview recovery.
- Improved four-tile crop, mixed maturity, step-by-step maturity, and blacklist fallback handling.
- Improved protected release generation, integrity verification, and local protected test package creation.
