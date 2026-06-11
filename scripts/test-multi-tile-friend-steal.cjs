"use strict";

const assert = require("node:assert/strict");
const { collectAllowedStealTargets } = require("../src/auto-farm-executor");

function buildFourTileStatus(anchorLandId, landIds, originX, originY, options = {}) {
  const positions = [
    { x: originX, y: originY + 1 },
    { x: originX + 1, y: originY + 1 },
    { x: originX, y: originY },
    { x: originX + 1, y: originY },
  ];
  return {
    farmType: "friend",
    landIds: { collect: [] },
    grids: landIds.map((landId, index) => ({
      landId,
      path: options.omitAnchorPath && landId === anchorLandId
        ? null
        : `startup/root/scene/farm_scene_v3/Scaled/Rotate/GridOrigin/grid_${positions[index].x}_${positions[index].y}`,
      gridPos: positions[index],
      hasPlant: true,
      hasDirectPlant: landId === anchorLandId,
      plantSize: landId === anchorLandId ? 2 : undefined,
      occupancyPlantSize: 2,
      occupancyAnchorLandId: anchorLandId,
      occupiedByMultiTilePlant: landId !== anchorLandId,
      isMature: true,
      stageKind: "mature",
      matureInSec: 0,
      leftFruit: 8,
      canSteal: options.canSteal !== false,
      canCollect: false,
    })),
  };
}

const liveLayoutStatus = {
  ...buildFourTileStatus(5, [1, 2, 5, 6], 0, 4),
  grids: [
    {
      landId: 1,
      path: "startup/root/scene/farm_scene_v3/Scaled/Rotate/GridOrigin/grid_0_5",
      gridPos: { x: 0, y: 5 },
      hasPlant: true,
      hasDirectPlant: false,
      plantSize: 2,
      occupancyPlantSize: 2,
      occupancyAnchorLandId: 5,
      occupiedByMultiTilePlant: true,
      isMature: true,
      stageKind: "mature",
      matureInSec: 0,
      leftFruit: 8,
      canSteal: true,
      canCollect: false,
    },
    {
      landId: 2,
      path: "startup/root/scene/farm_scene_v3/Scaled/Rotate/GridOrigin/grid_1_5",
      gridPos: { x: 1, y: 5 },
      hasPlant: true,
      hasDirectPlant: false,
      occupancyPlantSize: 2,
      occupancyAnchorLandId: 5,
      occupiedByMultiTilePlant: true,
      isMature: true,
      stageKind: "mature",
      matureInSec: 0,
      leftFruit: 8,
      canSteal: true,
      canCollect: false,
    },
    {
      landId: 5,
      path: "startup/root/scene/farm_scene_v3/Scaled/Rotate/GridOrigin/grid_0_4",
      gridPos: { x: 0, y: 4 },
      hasPlant: true,
      hasDirectPlant: true,
      plantSize: 2,
      occupancyPlantSize: 2,
      occupancyAnchorLandId: 5,
      occupiedByMultiTilePlant: false,
      isMature: true,
      stageKind: "mature",
      matureInSec: 0,
      leftFruit: 8,
      canSteal: true,
      canCollect: false,
    },
    {
      landId: 6,
      path: "startup/root/scene/farm_scene_v3/Scaled/Rotate/GridOrigin/grid_1_4",
      gridPos: { x: 1, y: 4 },
      hasPlant: true,
      hasDirectPlant: false,
      occupancyPlantSize: 2,
      occupancyAnchorLandId: 5,
      occupiedByMultiTilePlant: true,
      isMature: true,
      stageKind: "mature",
      matureInSec: 0,
      leftFruit: 8,
      canSteal: true,
      canCollect: false,
    },
  ],
};

const liveLayoutResult = collectAllowedStealTargets(liveLayoutStatus, []);
assert.equal(liveLayoutResult.multiTileHarvestDetected, true);
assert.deepEqual(liveLayoutResult.multiTileActionableLandIds, [5]);
assert.deepEqual(liveLayoutResult.targetedHarvestLandIds, [5]);

const arbitraryLayoutStatus = buildFourTileStatus(17, [13, 14, 17, 18], 2, 1, {
  canSteal: false,
  omitAnchorPath: true,
});
const arbitraryLayoutResult = collectAllowedStealTargets(arbitraryLayoutStatus, []);
assert.equal(arbitraryLayoutResult.multiTileHarvestDetected, true);
assert.deepEqual(arbitraryLayoutResult.multiTileFallbackLandIds, [17]);
assert.deepEqual(arbitraryLayoutResult.targetedHarvestLandIds, [17]);
console.log("[test-multi-tile-friend-steal] ok");
