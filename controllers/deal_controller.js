const Deal_Model = require("../models/Deal_Model");
const Pipeline_Model = require("../models/Pipeline_Model");
const Stage_Model = require("../models/Stage_Model");
const asyncHandler = require("express-async-handler");
const {
  deleteFiles,
  deleteActivities,
  deleteNotes,
} = require("../helper/DeleteHelper");

// Deal Functions
const createDeal = asyncHandler(async (req, res) => {
  const newDeal = new Deal_Model(req.body);
  const deal = await newDeal.save();

  const stage = await Stage_Model.findById(req.body.currentStage);
  stage.deals.push(deal._id);
  await stage.save();

  const pipeline = await Pipeline_Model.findById(stage.pipelineId);
  pipeline.deals.push(deal._id);
  await pipeline.save();

  res.status(200).json({ message: "Deal has been created", data: deal });
});

const getDeal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { select, populate } = req.query;

  if (!id) {
    return res.status(400).json({ success: false, message: "Missing deal ID" });
  }

  const deal = await Deal_Model.findById(id).populate(populate).select(select);

  if (!deal) {
    return res
      .status(404)
      .json({ success: false, message: "Activity not found" });
  }

  res.status(200).json({ success: true, data: deal });
});

const getDeals = asyncHandler(async (req, res) => {
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

  let deals;
  let total = 0;

  const queries = [];

  if (data) {
    queries.push(
      buildQuery(Deal_Model, filtersObj, limit, select, sortObj, start)
    );
  }

  if (count) {
    queries.push(
      Deal_Model.countDocuments(filtersObj)
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
        Deal_Model,
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
        [deals] = results;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  res.status(200).json({
    data: deals,
    meta: { total },
  });
});

const updateDealStage = asyncHandler(async (req, res) => {
  const { newStageId, prevStageId, dealId } = req.body;
  // // Remove deal id from previous stage
  await Stage_Model.findByIdAndUpdate(prevStageId, {
    $pull: { deals: dealId },
  });
  // add deal id to new stage
  await Stage_Model.findByIdAndUpdate(newStageId, {
    $push: { deals: dealId },
  });
  // update deal stage
  const deal = await Deal_Model.findById(dealId);
  deal.currentStage = newStageId;
  await deal.save();

  res.status(200).json({ message: "stage has been changed" });
});

const updateDeal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { update } = req.body;
  await Deal_Model.findByIdAndUpdate(id, update);
  res.status(200).json({ message: "Deal Has Been Updated" });
});

const deleteDeal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deal = await Deal_Model.findById(id);
  if (!deal) {
    res.status(404).json({ message: "Deal Not Found" });
    return;
  }

  await Promise.all([
    deleteFiles(deal.id),
    deleteActivities(deal.id),
    deleteNotes(deal.id),
  ]);

  await Stage_Model.findByIdAndUpdate(deal.currentStage, {
    $pull: { deals: id },
  });
  await deal.deleteOne();

  res.status(200).json({ message: "Deal Has Been Deleted" });
});

module.exports = {
  getDeal,
  getDeals,
  updateDealStage,
  createDeal,
  updateDeal,
  deleteDeal,
};
