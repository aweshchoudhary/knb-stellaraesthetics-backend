const router = require("express").Router();
const {
  createPipeline,
  getPipelines,
  getPipelineById,
  updatePipeline,
  deletePipelineById,
  checkUserExistsInPipeline,
  assignPipelineUser,
  removePipelineUser,
  transferOwnerShip,
} = require("../controllers/pipline_controller");
const verifyRoles = require("../middlewares/verifyRoles");

// PIPELINE ENDPOINTS
router.post("/add", verifyRoles("admin", "editor"), createPipeline);
router.get("/get-pipelines/", getPipelines);
router.get("/verify-user/:id", checkUserExistsInPipeline);
router.get("/get-pipeline/:id", getPipelineById);
router.put("/update/:id", updatePipeline);
router.put("/assign/:id", assignPipelineUser);
router.put("/remove/:id", removePipelineUser);
router.put("/transfer-ownership/:id", transferOwnerShip);
router.delete("/delete/:id", deletePipelineById);

module.exports = router;
