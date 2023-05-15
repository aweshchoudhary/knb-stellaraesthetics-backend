const { deleteDeals } = require("../../helper/DeleteHelper");
const StageModel = require("./StageModel");
const asyncHandler = require("express-async-handler");

// Stage Functions
const getStages = asyncHandler(async (req, res) => {
  const { filters, search, sort, limit, select, count, start, data } =
    req.query;

  let stages;
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
    stages = await StageModel.find(filtersObj)
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }
  if (count) {
    total = await StageModel.count(filtersObj)
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }
  if (search) {
    stages = await StageModel.find({ $text: { $search: search } })
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }
  res.status(200).json({ data: stages, meta: { total } });
});
const getStageById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { select, populate } = req.query;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Missing stage ID" });
  }

  const stage = await StageModel.findById(id).populate(populate).select(select);

  if (!stage) {
    return res
      .status(404)
      .json({ success: false, message: "Activity not found" });
  }

  res.status(200).json({ success: true, data: stage });
});
const createStage = asyncHandler(async (req, res) => {
  const { name, position, pipelineId } = req.body;
  const stages = await StageModel.find({});

  stages.forEach(async (item) => {
    if (item.position >= position) {
      item.position++;
      await item.save();
    }
  });

  const newStage = new StageModel({
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
  const { position, pipelineId } = req.params;
  // Delete the document with the given position number
  const stage = await StageModel.findOne({ position, pipelineId });

  // Update the position numbers of all the remaining documents
  const stagesToUpdate = await StageModel.find({
    position: { $gt: position },
    pipelineId,
  });
  for (let i = 0; i < stagesToUpdate.length; i++) {
    stagesToUpdate[i].position--;
    await stagesToUpdate[i].save();
  }
  await deleteDeals(stage.id);
  await stage.deleteOne();

  res.status(200).json({ message: "Stage Has Been Deleted" });
});

const updateStage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await StageModel.findByIdAndUpdate(id, req.body);
  res.status(200).json({ message: "Stage Has Been Updated" });
});

const reorderStages = asyncHandler(async (req, res) => {
  const { pipelineId } = req.params;
  const { stageId, newPosition } = req.body;
  const stages = await StageModel.find({ pipelineId });

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
  getStages,
  getStageById,
  createStage,
  deleteStage,
  updateStage,
  reorderStages,
};
