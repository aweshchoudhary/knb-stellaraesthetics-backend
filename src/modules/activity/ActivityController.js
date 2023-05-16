const ActivityModel = require("./ActivityModel");
const DealModel = require("../deal/DealModel");
const asyncHandler = require("express-async-handler");

const getActivities = asyncHandler(async (req, res) => {
  const { filters, search, sort, limit, select, count, start, data, populate } =
    req.query;

  const filtersObj = filters
    ? JSON.parse(filters).reduce(
        (obj, item) => ({ ...obj, [item.id]: item.value }),
        {}
      )
    : {};
  const sortObj = sort
    ? JSON.parse(sort).reduce(
        (obj, item) => ({ ...obj, [item.id]: item.desc ? "desc" : "asc" }),
        {}
      )
    : {};

  const buildQuery = (model, filtersObj, limit, select, sortObj, start) => {
    return model
      .find(filtersObj)
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0)
      .populate(populate);
  };

  let activities;
  let total = 0;

  const queries = [];

  if (data) {
    queries.push(
      buildQuery(ActivityModel, filtersObj, limit, select, sortObj, start)
    );
  }

  if (count) {
    queries.push(
      ActivityModel.countDocuments(filtersObj)
        .limit(limit || 25)
        .select(select)
        .sort(sortObj)
        .skip(start || 0)
        .then((count) => {
          total = count;
        })
    );
  }

  if (search) {
    queries.push(
      buildQuery(
        ActivityModel,
        { $text: { $search: search } },
        limit,
        select,
        sortObj,
        start,
        populate
      )
    );
  }

  await Promise.all(queries)
    .then((results) => {
      if (data) {
        [activities] = results;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  res.status(200).json({ data: activities, meta: { total } });
});
const getActivityById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { select, populate } = req.query;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Missing activity ID" });
  }

  const activity = await ActivityModel.findById(id)
    .populate(populate)
    .select(select);

  if (!activity) {
    return res
      .status(404)
      .json({ success: false, message: "Activity not found" });
  }

  res.status(200).json({ success: true, data: activity });
});

const addActivity = asyncHandler(async (req, res) => {
  const data = req.body;
  const newActivity = new ActivityModel({
    ...data,
  });
  const activity = await newActivity.save();
  const updateDealPromises = activity.deals.map(async (deal) => {
    await DealModel.findByIdAndUpdate(deal.toHexString(), {
      $push: { activities: activity.id },
    });
  });
  await Promise.all(updateDealPromises);

  res
    .status(200)
    .json({ message: "Activity has been added to card", data: activity });
});
const updateActivity = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await ActivityModel.findByIdAndUpdate(id, {
    ...req.body,
  });
  res.status(200).json({ message: "Activity has been updated" });
});

const deleteActivity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const activity = await ActivityModel.findById(id);

  const updateDealPromises = activity.deals.map(async (deal) => {
    await DealModel.findByIdAndUpdate(deal.toHexString(), {
      $pull: { activities: activity.id },
    });
  });
  await Promise.all(updateDealPromises).then(
    async () => await activity.deleteOne()
  );

  res.status(200).json({ message: "Activity has been deleted" });
});

module.exports = {
  addActivity,
  updateActivity,
  deleteActivity,
  getActivityById,
  getActivities,
};
