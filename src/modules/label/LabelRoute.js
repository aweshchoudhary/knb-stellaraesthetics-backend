const router = require("express").Router();
const {
  createLabel,
  getLabelById,
  getLabels,
  updateLabel,
  deleteLabel,
} = require("./LabelController");

// LABEL ENDPOINTS
router.post("/add", createLabel);
router.put("/update/:id", updateLabel);
router.delete("/delete/:id", deleteLabel);
router.get("/get-labels", getLabels);
router.get("/get-label/:id", getLabelById);

module.exports = router;
