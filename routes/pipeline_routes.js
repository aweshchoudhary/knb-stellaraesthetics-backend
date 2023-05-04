const router = require("express").Router();
const {
  createPipeline,
  getPipelines,
  getPipelineById,
  updatePipeline,
  deletePipelineById,
  checkUserExistsInPipeline,
} = require("../controllers/pipline_controller");
const verifyRoles = require("../middlewares/verifyRoles");

// PIPELINE ENDPOINTS
router.get("/get-pipelines/", getPipelines);
router.get("/verify-user/:id", checkUserExistsInPipeline);
router.get("/get-pipeline/:id", getPipelineById);
router.post("/add", verifyRoles("admin", "editor"), createPipeline);
router.put("/update/:id", updatePipeline);
router.delete("/delete/:id", deletePipelineById);

module.exports = router;
