const asyncHandler = require("express-async-handler");
const LabelModel = require("./LabelModel");

const createLabel = asyncHandler(async (req, res) => {
  const newLabel = new LabelModel({ ...req.body });
  const label = await newLabel.save();
  res.status(200).json({ message: "Label has been created", data: label });
});
const getLabels = asyncHandler(async (req, res) => {
  const labels = await LabelModel.find({});
  res.status(200).json({ message: "Label has been created", data: labels });
});
const getLabelById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { select, populate } = req.query;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Missing label ID" });
  }

  const label = await LabelModel.findById(id).populate(populate).select(select);

  if (!label) {
    return res
      .status(404)
      .json({ success: false, message: "Activity not found" });
  }

  res.status(200).json({ success: true, data: label });
});
const updateLabel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await LabelModel.findByIdAndUpdate(id, {
    ...req.body,
  });
  res.status(200).json({ message: "Label has been updated" });
});
const deleteLabel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await LabelModel.findByIdAndDelete(id);
  res.status(200).json({ message: "Label has been deleted" });
});

module.exports = {
  createLabel,
  getLabels,
  getLabelById,
  updateLabel,
  deleteLabel,
};
