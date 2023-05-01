const Activity_Model = require("../models/Activity_Model");
const Deal_Model = require("../models/Deal_Model");
const asyncHandler = require("express-async-handler");

const getAllActivities = asyncHandler(async (req, res) => {
  const activities = await Activity_Model.find({ ...req.query }).sort({
    startDate: "desc",
  });
  res.status(200).json({ data: activities });
});
const getActivitiesByDealId = asyncHandler(async (req, res) => {
  const { cardId, markDone, overdue } = req.params;
  const activities = await Activity_Model.find({
    cardId: { $in: cardId },
    markDone: markDone || false,
  }).sort({
    startDate: "desc",
  });
  if (overdue) {
  }
  res.status(200).json({ data: activities });
});
const getActivityById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const activity = await Activity_Model.findById(id);
  res.status(200).json({ data: activity });
});

const getActivitiesByContact = asyncHandler(async (req, res) => {
  const { clientId } = req.params;

  const cards = await Deal_Model.find({ contacts: { $in: clientId } });
  const cardIds = cards.map((card) => card.id);

  const allActivities = await Activity_Model.find({
    cardId: { $in: cardIds },
    markDone: false,
  }).sort({
    startDate: "desc",
  });

  res.status(200).json({ data: allActivities });
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
  getActivitiesByDealId,
  getActivityById,
  getAllActivities,
  getActivitiesByContact,
};
