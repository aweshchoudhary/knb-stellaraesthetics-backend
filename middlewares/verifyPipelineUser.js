const verifyUser = async (pipelineId, userId) => {
  let pipeline = await Pipeline_Model.findOne({
    _id: pipelineId,
    owner: userId,
  });

  if (!pipeline)
    pipeline = await Pipeline_Model.findOne({
      _id: pipelineId,
      assignees: { $in: userId },
    });

  if (!pipeline) return null;

  return pipeline._id;
};

module.exports = verifyUser;
