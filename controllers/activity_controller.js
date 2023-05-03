const Activity_Model = require("../models/Activity_Model");
const Deal_Model = require("../models/Deal_Model");
const asyncHandler = require("express-async-handler");

const getActivities = asyncHandler(async (req, res) => {
  const { filters, search, sort, limit, select, count, start, data } =
    req.query;

  let activities;
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
    activities = await Activity_Model.find(filtersObj)
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }
  if (count) {
    total = await Activity_Model.count(filtersObj)
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }
  if (search) {
    activities = await Activity_Model.find({ $text: { $search: search } })
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }
  res.status(200).json({ data: activities, meta: { total } });
});
const getActivityById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const activity = await Activity_Model.findById(id);
  res.status(200).json({ data: activity });
});

const addActivity = asyncHandler(async (req, res) => {
  const data = req.body;
  const newActivity = new Activity_Model({
    ...data,
  });
  const activity = await newActivity.save();
  res
    .status(200)
    .json({ message: "Activity has been added to card", data: activity });
});
const updateActivity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Activity_Model.findByIdAndUpdate(id, {
    ...req.body,
  });
  res.status(200).json({ message: "Activity has been updated" });
});
const deleteActivity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Activity_Model.findByIdAndDelete(id);
  res.status(200).json({ message: "Activity has been deleted" });
});

module.exports = {
  addActivity,
  updateActivity,
  deleteActivity,
  getActivityById,
  getActivities,
};
