const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const { hashSync, compareSync } = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

  const accessToken = await jwt.sign(
    { username: loggedUser.username, id: loggedUser.id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30d" }
  );

  res.status(200).json({
    message: "User logged in successfully",
    accessToken: "Bearer " + accessToken,
  });
});

module.exports = {
  register,
  login,
};
