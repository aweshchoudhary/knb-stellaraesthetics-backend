const AsyncHandler = require("express-async-handler");
const Pipeline_Model = require("../models/Pipeline_Model");
const { deletePipeline } = require("../helper/DeleteHelper");

const getPipelines = AsyncHandler(async (req, res) => {
  const { filters, search, sort, limit, select, count, start, data } =
    req.query;

  let pipelines;
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
    pipelines = await Pipeline_Model.find(filtersObj)
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }
  if (count) {
    total = await Pipeline_Model.count(filtersObj)
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }
  if (search) {
    pipelines = await Pipeline_Model.find({ $text: { $search: search } })
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }

  res.status(200).json({ data: pipelines, meta: { total } });
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
  getPipelineById,
  createPipeline,
  updatePipeline,
  deletePipelineById,
  getPipelines,
};
