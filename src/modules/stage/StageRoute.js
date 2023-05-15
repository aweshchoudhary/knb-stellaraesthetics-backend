const router = require("express").Router();
const {
  getStages,
  createStage,
  updateStage,
  deleteStage,
  getStageById,
  reorderStages,
} = require("./StageController");

// STAGE ENDPOINTS
router.post("/add", createStage);
router.get("/get-stages", getStages);
router.get("/get-stage/:id", getStageById);
router.put("/reorder/:pipelineId", reorderStages);
router.put("/update/:id", updateStage);
router.delete("/:pipelineId/:position", deleteStage);

module.exports = router;
