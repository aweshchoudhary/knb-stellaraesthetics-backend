const asyncHandler = require("express-async-handler");
const Label_Model = require("../models/Label_Model");

const createLabel = asyncHandler(async (req, res) => {
  const newLabel = new Label_Model({ ...req.body });
  const label = await newLabel.save();
  res.status(200).json({ message: "Label has been created", data: label });
});
const getLabels = asyncHandler(async (req, res) => {
  const labels = await Label_Model.find({});
  res.status(200).json({ message: "Label has been created", data: labels });
});
const getLabelById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const label = await Label_Model.findById(id);
  res.status(200).json({ message: "Label has been created", data: label });
});
const updateLabel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Label_Model.findByIdAndUpdate(id, {
    ...req.body,
  });
  res.status(200).json({ message: "Label has been updated" });
});
const deleteLabel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Label_Model.findByIdAndDelete(id);
  res.status(200).json({ message: "Label has been deleted" });
});

module.exports = {
  createLabel,
  getLabels,
  getLabelById,
  updateLabel,
  deleteLabel,
};
