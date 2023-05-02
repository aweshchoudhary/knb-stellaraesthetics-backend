const router = require("express").Router();
const {
  getUser,
  updateUser,
  deleteUser,
  getMe,
} = require("../controllers/user_controller");
const passportJWT = require("../auth/passport-jwt");

// USER ENDPOINTS
router.get(
  "/user/getme",
  passportJWT.authenticate("jwt", { session: false }),
  getMe
);
router.get(
  "/user/:id",
  passportJWT.authenticate("jwt", { session: false }),
  getUser
);
router.delete(
  "/user/:id",
  passportJWT.authenticate("jwt", { session: false }),
  updateUser
);
router.put(
  "/user/:id",
  passportJWT.authenticate("jwt", { session: false }),
  deleteUser
);

module.exports = router;
