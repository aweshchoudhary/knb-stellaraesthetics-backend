const PipelineModel = require("../modules/pipeline/PipelineModel");

const verifyUser = async (pipelineId, userId) => {
  const pipeline = await PipelineModel.findOne({
    _id: pipelineId,
    $or: [{ owner: userId }, { assignees: { $in: userId } }],
  }).select("_id owner");

  if (!pipeline) {
    return { pipelineId: false, userRole: false };
  }
  if (pipeline.owner.toHexString() === userId) {
    return { pipelineId: pipeline.id, userRole: "owner" };
  }

  return { pipelineId: pipeline.id, userRole: "assignee" };
};

module.exports = verifyUser;
