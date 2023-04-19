const expressAsyncHandler = require("express-async-handler");
const Pipeline_Model = require("../models/Pipeline_Model");

const getAllPipelines = expressAsyncHandler(async (req, res) => {
  const pipelines = await Pipeline_Model.find({});
  res.status(200).json({ data: pipelines });
});

const getPipelineById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const pipeline = await Pipeline_Model.findById(id);
  res.status(200).json({ data: pipeline });
});

const createPipeline = expressAsyncHandler(async (req, res) => {
  const newPipeline = new Pipeline_Model({
    ...req.body,
  });
  await newPipeline.save();
  res.status(200).json({ data: newPipeline });
});

const updatePipeline = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const pipeline = await Pipeline_Model.findByIdAndUpdate(id, req.body);
  res
    .status(200)
    .json({ message: "Pipeline has been updated", data: pipeline });
});

const deletePipeline = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  await Pipeline_Model.findByIdAndDelete(id);
  res.status(200).json({ message: "Pipeline has been deleted" });
});

module.exports = {
  getAllPipelines,
  getPipelineById,
  createPipeline,
  updatePipeline,
  deletePipeline,
};
