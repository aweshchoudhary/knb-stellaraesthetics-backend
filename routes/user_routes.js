const router = require("express").Router();
const {
  getUser,
  updateUser,
  deleteUser,
  getMe,
  getUsers,
} = require("../controllers/user_controller");

// USER ENDPOINTS
router.get("/getme", getMe);
router.get("/get-users", getUsers);

router.get("/get-user/:id", getUser);
router.delete("/:id", updateUser);
router.put("/:id", deleteUser);
module.exports = router;
