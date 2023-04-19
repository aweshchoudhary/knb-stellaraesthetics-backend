const Stage_Model = require("../models/Stage_Model");
const asyncHandler = require("express-async-handler");

// Stage Functions
const getAllStages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const stages = await Stage_Model.find({ pipelineId: id }).sort({
    position: "asc",
  });
  res.status(200).json({ data: stages });
});
const getStageById = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const stage = await Stage_Model.findById(id);
  res.status(200).json({ data: stage });
});
const createStage = asyncHandler(async (req, res) => {
  const { name, position, pipelineId } = req.body;
  const stages = await Stage_Model.find({});

  stages.forEach(async (item) => {
    if (item.position >= position) {
      item.position++;
      await item.save();
    }
  });

  const newStage = new Stage_Model({
    name,
    position,
    pipelineId,
  });
  const stage = await newStage.save();

  res
    .status(200)
    .json({ message: "Stage has been generated successfully", stage });
});
const deleteStage = asyncHandler(async (req, res) => {
  const { position } = req.params;
  // Delete the document with the given position number
  await Stage_Model.findOneAndDelete({ position });

  // Update the position numbers of all the remaining documents
  const stagesToUpdate = await Stage_Model.find({
    position: { $gt: position },
  });
  for (let i = 0; i < stagesToUpdate.length; i++) {
    stagesToUpdate[i].position--;
    await stagesToUpdate[i].save();
  }
  res.status(200).json({ message: "Stage Has Been Deleted" });
});
const updateStage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await Stage_Model.findByIdAndUpdate(id, { name });
  res.status(200).json({ message: "Stage Has Been Deleted" });
});

const reorderStages = asyncHandler(async (req, res) => {
  const { stageId, newPosition } = req.body;
  const stages = await Stage_Model.find({});

  // Find the element to update
  const elementIndex = stages.findIndex((item) => item.id === stageId);
  const element = stages[elementIndex];

  // Determine the direction of the move
  const moveDirection = newPosition > element.position ? 1 : -1;

  // Update the position of all elements between the old and new positions
  for (let i = element.position; i !== newPosition; i += moveDirection) {
    const targetIndex = stages.findIndex(
      (item) => item.position === i + moveDirection
    );
    stages[targetIndex].position = i;
    await stages[targetIndex].save();
  }

  // Update the position of the target element
  element.position = newPosition;
  await element.save();

  res.status(200).json({ message: "items reordered" });
});

module.exports = {
  getAllStages,
  getStageById,
  createStage,
  deleteStage,
  updateStage,
  reorderStages,
};
