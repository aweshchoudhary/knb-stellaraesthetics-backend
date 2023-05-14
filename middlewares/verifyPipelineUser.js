const Pipeline_Model = require("../models/Pipeline_Model");

const verifyUser = async (pipelineId, userId) => {
  if (!pipelineId || !userId) return { pipelineId: false, userRole: false };

  const pipeline = await Pipeline_Model.findOne({
    _id: pipelineId,
    $or: [{ owner: userId }, { assignees: { $in: userId } }],
  }).select("_id owner");
  console.log(pipelineId);
  console.log(userId);
  if (!pipeline) {
    return { pipelineId: false, userRole: false };
  }
  if (pipeline.owner.toHexString() === userId) {
    return { pipelineId: pipeline.id, userRole: "owner" };
  }

  return { pipelineId: pipeline.id, userRole: "assignee" };
};

module.exports = verifyUser;
