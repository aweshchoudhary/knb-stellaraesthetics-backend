const router = require("express").Router();
const {
  addActivity,
  updateActivity,
  deleteActivity,
  getActivityById,
  getActivities,
} = require("./ActivityController");

// ACTIVITY ENDPOINTS
router.post("/add", addActivity);
router.put("/update/:id", updateActivity);
router.delete("/delete/:id", deleteActivity);
router.get("/get-activity/:id", getActivityById);
router.get("/get-activities", getActivities);

module.exports = router;
