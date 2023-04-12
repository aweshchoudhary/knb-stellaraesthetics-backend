const Activity_Model = require("../models/Activity_Model");
const asyncHandler = require("express-async-handler");

const getActivitiesByCardId = asyncHandler(async (req, res) => {
  const { cardId, markDone } = req.params;
  const activities = await Activity_Model.find({
    cardId,
    markDone: markDone || false,
  }).sort({
    startDate: "desc",
  });
  res.status(200).json({ data: activities });
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
  const { data } = req.body;
  await Activity_Model.findByIdAndUpdate(id, {
    ...data,
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
  getActivitiesByCardId,
  getActivityById,
};
