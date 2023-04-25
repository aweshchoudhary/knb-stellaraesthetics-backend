const AsyncHandler = require("express-async-handler");
const Pipeline_Model = require("../models/Pipeline_Model");
const { deletePipeline } = require("../helper/DeleteHelper");

const getAllPipelines = AsyncHandler(async (req, res) => {
  const pipelines = await Pipeline_Model.find({});
  res.status(200).json({ data: pipelines });
});

const getPipelineById = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const pipeline = await Pipeline_Model.findById(id);
  res.status(200).json({ data: pipeline });
});

const createPipeline = AsyncHandler(async (req, res) => {
  const newPipeline = new Pipeline_Model({
    ...req.body,
  });
  await newPipeline.save();
  res.status(200).json({ data: newPipeline });
});

const updatePipeline = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const pipeline = await Pipeline_Model.findByIdAndUpdate(id, req.body);
  res
    .status(200)
    .json({ message: "Pipeline has been updated", data: pipeline });
});

const deletePipelineById = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  await deletePipeline(id);
  res.status(200).json({ message: "Pipeline has been deleted" });
});

module.exports = {
  getAllPipelines,
  getPipelineById,
  createPipeline,
  updatePipeline,
  deletePipelineById,
};
