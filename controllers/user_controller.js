const User_Model = require("../models/User_Model");
const asyncHandler = require("express-async-handler");

const getMe = asyncHandler(async (req, res) => {
  const user = req.user;
  // const user = await User_Model.findById(id);
  const filteredUser = {
    _id: user._id,
    fullname: user.fullname,
    username: user.username,
    email: user.email,
    role: user.role,
  };
  res.status(200).json({ data: filteredUser });
});

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User_Model.findById(id);
  const filteredUser = {
    _id: user._id,
    fullname: user.fullname,
    username: user.username,
    email: user.email,
  };
  res.status(200).json({ data: filteredUser });
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User_Model.findByIdAndUpdate(id, req.body);
  const filteredUser = {
    fullname: user.fullname,
    username: user.username,
    email: user.email,
  };
  res.status(200).json({ data: filteredUser });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User_Model.findByIdAndDelete(id);
  const filteredUser = {
    fullname: user.fullname,
    username: user.username,
    email: user.email,
  };
  res.status(200).json({ data: filteredUser });
});

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  getMe,
};
