const AsyncHandler = require("express-async-handler");
const PipelineModel = require("./PipelineModel");
const { deletePipeline } = require("../../helper/DeleteHelper");
const verifyPipelineUser = require("../../middlewares/verifyPipelineUser");

const checkUserExistsInPipeline = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const { pipelineId, userRole } = await verifyPipelineUser(id, user.id);
  // console.log(id);
  // console.log(userRole);
  res.status(200).json({ viewOnly: !pipelineId ? true : false, userRole });
});

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
    pipelines = await PipelineModel.find(filtersObj)
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }
  if (count) {
    total = await PipelineModel.count(filtersObj)
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }
  if (search) {
    pipelines = await PipelineModel.find({ $text: { $search: search } })
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }

  res.status(200).json({ data: pipelines, meta: { total } });
});

const getPipelineById = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { select, populate } = req.query;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Missing pipeline ID" });
  }

  const pipeline = await PipelineModel.findById(id)
    .populate(populate)
    .select(select);

  if (!pipeline) {
    return res
      .status(404)
      .json({ success: false, message: "Activity not found" });
  }

  res.status(200).json({ success: true, data: pipeline });
});

const createPipeline = AsyncHandler(async (req, res) => {
  const newPipeline = new PipelineModel({
    ...req.body,
  });
  await newPipeline.save();
  res.status(200).json({ data: newPipeline });
});

const updatePipeline = AsyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  const { pipelineId } = await verifyPipelineUser(id, user.id);

  if (!pipelineId)
    return res.status(401).json({ message: "You don't have an access" });

  const pipeline = await PipelineModel.findByIdAndUpdate(pipelineId, req.body);

  res
    .status(200)
    .json({ message: "Pipeline has been updated", data: pipeline });
});

const assignPipelineUser = AsyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { newUserId } = req.body;

  const { pipelineId, userRole } = await verifyPipelineUser(id, user.id);

  if (!pipelineId)
    return res
      .status(401)
      .json({ message: "You don't have an access to this pipeline" });

  if (userRole !== "owner")
    return res.status(401).json({ message: "Only Owner can assign a user" });

  const pipeline = await PipelineModel.findById(pipelineId);
  const isExistsUser = pipeline.assignees.includes(newUserId);

  if (isExistsUser)
    return res
      .status(403)
      .json({ message: "User is already assigned to pipeline" });

  pipeline.assignees.push(newUserId);
  await pipeline.save();
  res
    .status(200)
    .json({ message: "Pipeline has been updated", data: pipeline });
});

const removePipelineUser = AsyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { userId } = req.body;

  const { pipelineId, userRole } = await verifyPipelineUser(id, user.id);

  if (!pipelineId || !userRole)
    return res
      .status(401)
      .json({ message: "You don't have an access to this pipeline" });

  if (userRole !== "owner")
    return res.status(401).json({ message: "Only Owner can assign a user" });

  await PipelineModel.findByIdAndUpdate(pipelineId, {
    $pull: { assignees: userId },
  });

  res.status(200).json({ message: "User has been removed from pipeline" });
});

const transferOwnerShip = AsyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { newOwnerId } = req.body;

  const { pipelineId, userRole } = await verifyPipelineUser(id, user.id);

  if (!pipelineId || !userRole)
    return res
      .status(401)
      .json({ message: "You don't have an access to this pipeline" });

  if (userRole !== "owner")
    return res
      .status(401)
      .json({ message: "Only Owner can transfer ownership" });

  const updatePipeline = await PipelineModel.findById(pipelineId);
  updatePipeline.owner = newOwnerId;
  updatePipeline.save();

  res.status(200).json({ message: "Ownership transfered successfully" });
});

const deletePipelineById = AsyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  const { pipelineId } = await verifyPipelineUser(id, user.id);

  if (!pipelineId)
    return res.status(401).json({ message: "You don't have an access" });

  await deletePipeline(pipelineId);
  res.status(200).json({ message: "Pipeline has been deleted" });
});

module.exports = {
  getPipelineById,
  createPipeline,
  updatePipeline,
  deletePipelineById,
  getPipelines,
  checkUserExistsInPipeline,
  assignPipelineUser,
  removePipelineUser,
  transferOwnerShip,
};
