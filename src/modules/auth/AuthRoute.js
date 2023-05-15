const router = require("express").Router();
const { register, login } = require("./AuthController");
const passportJWT = require("../../middlewares/auth/passport-jwt");

// PIPELINE ENDPOINTS
router.post("/register", register);
router.post("/login", login);
router.get(
  "/protected",
  passportJWT.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ user: req.user });
  }
);

module.exports = router;
