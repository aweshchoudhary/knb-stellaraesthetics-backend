const router = require("express").Router();
const {
  getUser,
  updateUser,
  deleteUser,
  getMe,
} = require("../controllers/user_controller");

// USER ENDPOINTS
router.get("/getme", getMe);
router.get("/:id", getUser);
router.delete("/:id", updateUser);
router.put("/:id", deleteUser);

module.exports = router;
