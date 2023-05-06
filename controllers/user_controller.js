const User_Model = require("../models/User_Model");
const asyncHandler = require("express-async-handler");

const getMe = asyncHandler(async (req, res) => {
  const loggedUser = req.user;
  const user = await User_Model.findById(loggedUser._id).select(
    "_id fullnam username email role"
  );
  res.status(200).json({ data: user });
});

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User_Model.findById(id).select(
    "fullname username email role"
  );
  if (!user)
    return res.status(404).json({ message: "User not found or Deleted" });
  res.status(200).json({ data: user });
});

const getUsers = asyncHandler(async (req, res) => {
  const { filters, search, sort, limit, select, count, start, data } =
    req.query;

  let users;
  let total = 0;
  let sortObj;
  let filtersObj = {};

  if (filters) {
    const filtersArr = JSON.parse(filters);
    filtersArr.forEach((item) => {
      filtersObj = {
        ...filtersObj,
        [item.id]: item.value,
      };
    });
  }
  if (sort) {
    const sortArr = JSON.parse(sort);
    sortArr.forEach((item) => {
      sortObj = {
        ...sortObj,
        [item.id]: item.desc ? "desc" : "asc",
      };
    });
  }
  if (data) {
    users = await User_Model.find(filtersObj)
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }
  if (count) {
    total = await User_Model.count(filtersObj)
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }
  if (search) {
    users = await User_Model.find({ $text: { $search: search } })
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }

  res.status(200).json({ data: users, meta: { total } });
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
  getUsers,
  updateUser,
  deleteUser,
  getMe,
};
