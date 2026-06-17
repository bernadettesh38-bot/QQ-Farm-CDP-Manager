# Changelog

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
