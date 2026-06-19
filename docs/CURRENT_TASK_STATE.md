# Current Task State

## Active Task

v1.9.8-hotfix test package: fix regressions found after v1.9.8-test.

Latest user request on 2026-06-19:

- Package a preflight/test build.
- Publish it to the public GitHub repository by creating a preflight test
  branch.
- Keep public publishing protected-only; do not push private source packages to
  the public repository.
- Do not create a formal Release or formal tag unless explicitly requested.

Follow-up request on 2026-06-19:

- `1.9.8-b` must fix LAN mobile-control token URLs that still fail after
  enabling mobile LAN control.
- Publish the fixed protected package to a new public GitHub preflight branch,
  not to the formal `protected-release` branch.

User-reported issues on 2026-06-18:

1. Desktop shell is still crowded. The shell needs a real layout cleanup, not
   just extra cards.
2. After enabling LAN mobile control, desktop shell Settings cannot open. The
   shell reports an IPC error similar to `Error invoking remote method
   desktop:open-settings`; local web settings still work through
   `http://127.0.0.1:8787`.
3. Friend mischief is failing repeatedly with:
   `[warn] Auto farm / friend mischief / friend mischief action failed`
   followed by `friend mischief exit reason recorded`.
4. Friend mischief is a two-step runtime action: enter friend farm, click a
   friend land tile, then a grass or bug component appears; the bot must click
   the resulting grass/bug component, not treat the first land click as the
   completed action. The user provided a screenshot showing grass and bug
   components with "100" badges above them.
5. Mobile page should be a full mobile-adapted version of the local web
   settings page, not a tiny partial control page.
6. Re-check that light/dark theme persistence is really fixed.

Required release target:

- Build and push a GitHub test branch/package for `v1.9.8-hotfix`.
- Keep this task context updated before long steps so context compaction can
  recover progress.
- Do not create a formal GitHub Release or formal tag unless explicitly asked.
- Do not modify WMPF/Frida.

Current v1.9.8-hotfix status:

- Context backup created in this file.
- Fixed desktop shell Settings URL to use `127.0.0.1` when the gateway listens
  on `0.0.0.0`.
- Reduced shell crowding by increasing shell height, enabling vertical scroll,
  and folding secondary status into a collapsed `More status` section.
- Replaced reduced `/mobile.html` page with full `public/index.html` plus
  mobile CSS and token-aware fetch injection.
- Added two-step runtime `gameCtl.runFriendMischief` / `gameCtl.friendMischief`
  in `button.js`: pick/click friend land, wait for grass/bug component, then
  click the component before reporting success.
- Rebuilt `button-lite.js`.
- Updated tests to cover desktop settings URL, full mobile page, and two-step
  friend mischief runtime exports.
- Version changed to `1.9.8-hotfix`.
- Next: run tests, release dry-run, verify packages, commit, and push test
  branch.

Additional user feedback after `PUBLIC-20260618-011` on 2026-06-18:

- Desktop shell still reports failures:
  - "Start automation failed" because the started automation item list is empty.
  - Runtime info shows `Error invoking remote method 'desktop:start-auto-farm':
    Error: HTTP 400`.
  - Settings/open path still has an HTTP 400 style failure in the desktop shell
    path, while browser access to `127.0.0.1:8787` may still work.
- Finish all remaining fixes, then perform real-machine testing.
- Real-machine friend mischief acceptance standard: use up today's full shared
  100 action quota across grass and bug actions. Testing should not stop after a
  single synthetic success.
- Continue updating this file before long steps so context compaction can
  recover the task.

Previous task:

v1.9.8-test: friend mischief automation, stable shared daily ledger, desktop
shell status grouping, disabled-by-default LAN mobile control, local
source/protected dry-run packages, and GitHub test-branch push only.

## v1.9.8-test Completed So Far

- Added `friend_mischief` scheduler/config plumbing with priority 58.
- Added stable user-data friend mischief ledger for grass and bug actions with
  one shared daily limit hard-capped at 100.
- Added friend mischief diagnostics routing to `friend-mischief-trace.jsonl`.
- Added dashboard controls for friend mischief and LAN mobile control.
- Added disabled-by-default LAN mobile control with random token protection,
  `/mobile.html`, `/api/lan-control`, token refresh, and `/api/config/update`.
- Added desktop shell grouped status cards for host, scheduler, diagnostics,
  and quick actions.
- Updated README, CHANGELOG, AGENTS, and AI_AGENT_POLICY for v1.9.8-test rules.
- Added tests:
  - `scripts/test-friend-mischief-ledger.cjs`
  - `scripts/test-friend-mischief-config.cjs`
  - `scripts/test-lan-mobile-control.cjs`
- Cleaned `release-output` old pre-1.9.7 folders/files, keeping `private/` and
  `public/` output roots.

## v1.9.8-test Pending

- Run `npm.cmd run release:dual -- --version 1.9.8-test --dry-run --allow-dirty`.
- Verify generated source/protected packages and local protected test tree.
- Commit and push `test/v1.9.8-friend-mischief-lan-mobile`.
- Do not create a formal Release, formal tag, or protected public release
  branch publish for this test version.

## Task

v1.9.7-hotfix: persistent user-facing QQ host mode and independent light/dark
theme persistence.

## Current Stage

- v1.9.7 was published before this hotfix task.
- v1.9.7-hotfix source changes are being prepared and verified in
  `E:\QQ-Farm-CDP-Manager-opt`.
- v1.9.7-hotfix must generate matching source/protected packages and pass
  protected verification before publishing.

## v1.9.7-hotfix Completed

- Added persistent `qqHostMode` user config with allowed values `auto` and
  `manual`.
- Added Web control-page QQ host mode selector.
- Added desktop shell QQ host mode toggle for ordinary users before service
  startup.
- Connected saved QQ host mode to QQ startup through config/env and protected
  diagnostics.
- Changed farm-config save to merge nested settings instead of replacing
  unrelated settings.
- Preserved `uiTheme` when Web automation settings are saved or toggled.
- Added `scripts/test-user-settings-persistence.cjs` and wired it into
  `release:dual`.

## v1.9.7 Completed

- Latest v1.9.7 attachment re-read on 2026-06-18.
- Added QQ manual-host mode through `--qq-manual-host`,
  `FARM_QQ_MANUAL_HOST=1`, or `FARM_QQ_HOST_MODE=manual`.
- In manual-host mode, QQ automatic bootstrap/reload is disabled and process
  guard restart is suppressed while the user opens QQ Farm manually.
- Added QQ restart-source diagnostics for bootstrap and process guard paths,
  including WebSocket, GameCtl, runtime-context, and health-state snapshots.
- Added normal friend-help limit recalculation when the configured limit changes
  and stale daily-limit state should be cleared.
- Added normal friend-help diagnostics for configured/effective limit, candidate
  creation, dispatch, action execution, and skip/no-op reasons.
- Added own-farm plant-after-harvest follow-up scheduling and harvest-to-plant
  delay diagnostics.
- Added `scripts/test-v1-9-7-regressions.cjs` and wired it into
  `release:dual`.
- Wired `scripts/test-friend-help-limit-separation.cjs` into `release:dual`.
- Updated package version, README, CHANGELOG, AGENTS, AI_AGENT_POLICY, and this
  task-state file for v1.9.7.

## Completed

- Task attachment re-read on 2026-06-18.
- AGENTS.md re-read on 2026-06-18.
- AI_AGENT_POLICY.md re-read on 2026-06-18.
- Current git status checked on 2026-06-18.
- Compared source/protected `/api/health` and `/api/auto-farm` schema captures.
- Confirmed protected `/api/health` can exceed the old 1500 ms desktop timeout.
- Updated desktop service status handling to use a 5000 ms health timeout, stale-health grace,
  independent port PID detection, and layered ready fields.
- Added protected desktop status regression test and wired it into `release:dual` checks.
- Added desktop JSONL diagnostic writer and hooked auto-farm manager events into it.
- Added desktop diagnostics regression test and wired it into `release:dual` checks.
- Updated `AI_AGENT_POLICY.md` to clean English UTF-8 and changed release-integrity policy
  validation to require clean English public-benefit text instead of a legacy mojibake token.
- Added `scripts/scan-mojibake.cjs` and `docs/ENCODING_SCAN_REPORT.md`.
- `npm.cmd run release:dual -- --version 1.9.6 --dry-run --allow-dirty` passed with
  build id `PUBLIC-20260618-003`.
- Dry-run generated local protected test tree:
  `F:\QQ-Farm-Protected-Tests\v1.9.6-PUBLIC-20260618-003`.
- Protected runtime smoke test on port 8787 reached signed-core gateway health.
- Protected desktop `getSnapshot()` returned `service.running=true`, `phase=running`,
  `processAlive=true`, `httpReady=true`, `gatewayReady=true`, `schedulerReady=true`.
- Protected health latency sample on connected runtime: 20/20 success, max 1746 ms,
  avg 1094.6 ms, 6 samples over the old 1500 ms threshold.
- Protected diagnostics writer smoke test created `home-farm-trace.jsonl`.
- QQ-link launch attempt was executed once. After 20 seconds, protected health still reported
  `qqWs.connected=false`, `qq_ws_disconnected`, and `qqBundle.sync.status=target_outdated`.
- Restarting the protected test instance from the protected tree reloaded QQ Farm into the
  current bootstrap. Final status: `qq_ws_connected`, `gameCtl=ready`,
  `qq_runtime_context_ready`, `qqBundle.sync.status=runtime_synced`.
- Final active protected test instance: build id `PUBLIC-20260618-003`, port 8787,
  integrity `signed-core`.
- Real-runtime task verification on protected runtime:
  - `own_base`: `real_action_confirmed`.
  - `own_collect`: explicit no-op `home_harvest_due_not_detected`.
  - `own_plant`: explicit no-op `no_empty_lands`.
  - `friend_steal`: explicit no-op `stealable_state_empty`.
  - `friend_help`: `real_action_confirmed`.
  - `guard_dog_help`: explicit no-op `guarddog_action_not_available`.
- Desktop diagnostics generated all required trace files:
  `home-farm-trace.jsonl`, `friend-steal-trace.jsonl`, `normal-help-trace.jsonl`,
  `guarddog-action-trace.jsonl`, `scheduler-trace.jsonl`, `qq-runtime-trace.jsonl`,
  and `protected-status-trace.jsonl`.
- Latest attachment re-read on 2026-06-18 requested final candidate
  `v1.9.6-PUBLIC-20260618-003`, port 8787 cleanup, pre-release verification,
  changelog/docs sync, and no GitHub publish/tag/push before confirmation.
- Stopped 8787 listener PID 18996 and confirmed the port is clean.
- Verified candidate paths exist:
  - `release-output\private\v1.9.6-PUBLIC-20260618-003\QQ-Farm-CDP-Manager-v1.9.6-source.zip`
  - `release-output\public\v1.9.6-PUBLIC-20260618-003\QQ-Farm-CDP-Manager-v1.9.6-protected.zip`
  - `F:\QQ-Farm-Protected-Tests\v1.9.6-PUBLIC-20260618-003`
- `npm.cmd run release:verify` passed for the source workspace.
- `npm.cmd run release:verify -- release-output\private\v1.9.6-PUBLIC-20260618-003\QQ-Farm-CDP-Manager-v1.9.6-source.zip` passed.
- `npm.cmd run release:verify -- release-output\public\v1.9.6-PUBLIC-20260618-003\QQ-Farm-CDP-Manager-v1.9.6-protected.zip` passed.
- `npm.cmd run release:verify -- F:\QQ-Farm-Protected-Tests\v1.9.6-PUBLIC-20260618-003` passed.
- Protected package tests passed for tamper checks, runtime size, desktop status,
  desktop diagnostics, and docs-only mojibake scan.
- Updated CHANGELOG, README, AGENTS, and AI_AGENT_POLICY with v1.9.6-003
  status/diagnostics/UTF-8 release rules. These source docs were updated after
  candidate package generation to avoid changing the requested `003` build id.

## Pending

- Run source regression tests and docs-only encoding scan for v1.9.7-hotfix.
- Run `npm run release:dual -- --version 1.9.7-hotfix --dry-run --allow-dirty`.
- Verify the generated protected package can persist QQ host mode and theme
  mode, including restart reads and Web automation/theme preservation.
- Publish v1.9.7-hotfix only after protected verification passes.

## Blocked

- None currently.

## Last Modified Files

- `desktop-sample/service-controller.js`
- `src/desktop-diagnostics.js`
- `src/auto-farm-manager.js`
- `scripts/test-protected-desktop-status.cjs`
- `scripts/test-desktop-diagnostics.cjs`
- `scripts/scan-mojibake.cjs`
- `scripts/dual-release.cjs`
- `scripts/test-protected-release.cjs`
- `src/release-integrity.js`
- `AGENTS.md`
- `AI_AGENT_POLICY.md`
- `docs/ENCODING_SCAN_REPORT.md`
- `docs/CURRENT_TASK_STATE.md`

## Tests Run

- `node --check desktop-sample/service-controller.js`
- `node --check src/desktop-diagnostics.js`
- `node --check src/auto-farm-manager.js`
- `node --check scripts/test-desktop-diagnostics.cjs`
- `node scripts/test-protected-desktop-status.cjs`
- `node scripts/test-desktop-diagnostics.cjs`
- `node scripts/test-desktop-runtime-switch.cjs`
- `node scripts/test-auto-farm-scheduler-protocol.cjs`
- `node scripts/test-auto-plant-fast-path.cjs`
- `node scripts/test-multi-tile-auto-plant.cjs`
- `node scripts/test-auto-fertilizer-purple-land.cjs`
- `node scripts/test-friend-guard-dog.cjs`
- `node scripts/test-friend-guard-dog-context-cache.cjs`
- `node scripts/test-friend-guard-dog-priority.cjs`
- `node scripts/test-health-payload-cost.cjs`
- `node scripts/test-friend-status-watcher-cost.cjs`
- `node scripts/test-preview-recovery.cjs`
- `node scripts/scan-mojibake.cjs --docs-only --fail`
- `npm.cmd run release:dual -- --version 1.9.6 --dry-run --allow-dirty`
- Protected runtime smoke: `GET http://127.0.0.1:8787/api/health`
- Protected desktop smoke: `desktop-sample/service-controller.getSnapshot()`
- Protected diagnostics smoke: `src/desktop-diagnostics.createDesktopDiagnosticWriter()`

## Next Action

Run v1.9.7-hotfix verification, generate matching source/protected artifacts,
then publish only after protected checks pass.

## Boundaries

- Do not modify `wmpf/`, `wmpf/frida/`, `hook.js`, `addresses.*.json`, WMPF patch scenes,
  or ExtraPatchSceneNumbers.
- Do not publish v1.9.7-hotfix if signed manifest, whitelist, sensitive-data,
  source-leak, tamper, protected diagnostics, or protected runtime checks fail.
