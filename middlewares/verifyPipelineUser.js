const Pipeline_Model = require("../models/Pipeline_Model");

const verifyUser = async (pipelineId, userId) => {
  const pipeline = await Pipeline_Model.findOne({
    _id: pipelineId,
    $or: [{ owner: userId }, { assignees: { $in: userId } }],
  }).select("id owner assignees");

  if (!pipeline) {
    return false;
  }

  if (pipeline.owner === userId) {
    return { pipelineId: pipeline.id, userRole: "owner" };
  } else {
    return false;
  }

  return { pipelineId: pipeline.id, userRole: "assignee" };
};

module.exports = verifyUser;
