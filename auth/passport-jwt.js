const passport = require("passport");
const User = require("../models/User_Model");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
require("dotenv").config();

const cookieExtractor = (req) => {
  let accessToken = null;
  if (req && req.cookies) {
    accessToken = req.cookies["accessToken"];
  }
  return accessToken;
};

const options = {};
options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET_KEY;
options.issuer = process.env.ADMIN_EMAIL;
options.audience = process.env.WEB_URL;

passport.use(
  new JWTStrategy(options, async (payload, cb) => {
    try {
      const user = await User.findById(payload.id);
      cb(null, user);
    } catch (error) {
      console.log(error);
      cb(error.message, false);
    }
  })
);

module.exports = passport;
