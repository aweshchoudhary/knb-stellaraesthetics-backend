const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const { hashSync, compareSync } = require("bcryptjs");
const jwt = require("jsonwebtoken");

const accessTokenCookieOptions = {
  expires: new Date(Date.now() + 59 * 60 * 1000),
  maxAge: 39 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};
const refreshTokenCookieOptions = {
  expires: new Date(Date.now() + 59 * 60 * 1000),
  maxAge: 59 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

const register = asyncHandler(async (req, res) => {
  const { fullname, username, email, password } = req.body;
  if (!fullname || !username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newUser = new User({
    fullname,
    username,
    email,
    password: hashSync(password, 10),
  });

  await newUser.save();
  res.status(200).json({ message: "User registered successfully" });
});

const login = asyncHandler(async (req, res) => {
  const { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const isEmail = user.search("@");

  const loggedUser = await User.findOne(
    isEmail !== -1 ? { email: user } : { username: user }
  );

  if (!loggedUser) {
    return res.status(404).json({ message: "Email or Username incorrect" });
  }
  const isPasswordCorrect = compareSync(password, loggedUser.password);

  if (!isPasswordCorrect) {
    return res.status(403).json({ message: "Password is incorrect" });
  }

  const accessToken = jwt.sign(
    { username: loggedUser.username, id: loggedUser.id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30d" }
  );

  const refreshToken = jwt.sign(
    { username: loggedUser.username, id: loggedUser.id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "60d" }
  );

  res.cookie("access_token", accessToken, accessTokenCookieOptions);

  res.cookie("refresh_token", refreshToken, refreshTokenCookieOptions);

  res.status(200).json({
    message: "User logged in successfully",
    accessToken: "Bearer " + accessToken,
  });
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("access_token", "", { maxAge: 1 });
  res.cookie("refresh_token", "", { maxAge: 1 });

  res.status(200).json({
    message: "User logged in successfully",
    accessToken: "Bearer " + accessToken,
  });
});

const refreshAccessTokenHandler = asyncHandler(async (req, res) => {
  // Get the refresh token from cookie
  const refresh_token = req.cookies.refresh_token;

  // Validate the Refresh token
  const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET_KEY);
  const message = "Could not refresh access token";
  if (!decoded) {
    return res.status(403).json({ message });
  }

  // Check if the user exist
  const user = await findUserById(decoded.id);

  if (!user) {
    return res.status(403).json({ message });
  }

  // Sign new access token
  const access_token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET_KEY,
    accessTokenCookieOptions
  );

  // Send the access token as cookie
  res.cookie("access_token", access_token, accessTokenCookieOptions);

  // Send response
  res.status(200).json({
    status: "success",
    access_token,
  });
});

module.exports = {
  register,
  login,
  logout,
  refreshAccessTokenHandler,
};
