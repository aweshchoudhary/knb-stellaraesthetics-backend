const ActivityModel = require("../modules/activity/ActivityModel");

const verifyUser = async (activityId, userId) => {
  const activity = await ActivityModel.findOne({
    _id: activityId,
    creator: userId,
  }).select("_id creator");

  if (!activity) {
    return { activityId: false, userRole: false };
  }
  return { activityId: activity.id, userRole: "creator" };
};

module.exports = verifyUser;
