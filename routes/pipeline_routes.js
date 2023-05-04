const router = require("express").Router();
const ROLES_LIST = require("../config/roles_list");
const {
  createPipeline,
  getPipelines,
  getPipelineById,
  updatePipeline,
  deletePipelineById,
  verifyPipelineUser,
} = require("../controllers/pipline_controller");

// PIPELINE ENDPOINTS
router.get("/get-pipelines/", getPipelines);
router.get("/verify-user/:id", verifyPipelineUser);
router.get("/get-pipeline/:id", getPipelineById);
router.post("/add", createPipeline);
router.put("/update/:id", updatePipeline);
router.delete("/delete/:id", deletePipelineById);

module.exports = router;
