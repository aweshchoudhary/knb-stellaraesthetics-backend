const AsyncHandler = require("express-async-handler");
const Pipeline_Model = require("../models/Pipeline_Model");
const { deletePipeline } = require("../helper/DeleteHelper");
const Stage_Model = require("../models/Stage_Model");

const getPipelines = AsyncHandler(async (req, res) => {
  const {
    filters,
    search,
    sort,
    limit,
    select,
    count,
    start,
    data,
    dataFilters,
  } = req.query;

  let pipelines;
  let total = 0;
  let sortObj;

  if (sort) {
    const sortArr = JSON.parse(sort);
    sortArr.forEach((item) => {
      sortObj = {
        [item.id]: item.desc ? "desc" : "asc",
      };
    });
  }

  if (data) {
    pipelines = await Pipeline_Model.find(dataFilters || {})
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }
  if (count) {
    total = await Pipeline_Model.count(dataFilters || search || {})
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
