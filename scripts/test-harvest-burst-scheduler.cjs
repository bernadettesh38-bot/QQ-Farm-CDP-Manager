"use strict";

const assert = require("node:assert/strict");
const { AutoFarmManager } = require("../src/auto-farm-manager");

const manager = new AutoFarmManager({
  projectRoot: process.cwd(),
});
manager.updateConfig({
  autoFarmOwnEnabled: true,
  autoFarmOwnCollectEnabled: true,
  autoFarmOwnCollectIntervalSec: 5,
});

const now = 1_000_000;
manager.lastOwnCollectRunAt = now;

assert.equal(manager._getTaskDueAtMs("own_collect", now, false), now + 5000);

manager.ownCollectBurstUntil = now + 15_000;
assert.equal(manager._getTaskDueAtMs("own_collect", now, false), now + 1000);

manager.ownCollectBurstUntil = now - 1;
assert.equal(manager._getTaskDueAtMs("own_collect", now, false), now + 5000);

manager.updateConfig({
  autoFarmFriendEnabled: true,
  autoFarmFriendStealIntervalSec: 90,
});
manager.lastFriendStealRunAt = now;
assert.equal(manager._getTaskDueAtMs("friend_steal", now, false), now + 90_000);

manager.friendStealBurstUntil = now + 20_000;
assert.equal(manager._getTaskDueAtMs("friend_steal", now, false), now + 3000);

manager.friendStealBurstUntil = now - 1;
assert.equal(manager._getTaskDueAtMs("friend_steal", now, false), now + 90_000);

console.log("[test-harvest-burst-scheduler] ok");
