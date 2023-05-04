const Deal_Model = require("../models/Deal_Model");
const Pipeline_Model = require("../models/Pipeline_Model");
const Stage_Model = require("../models/Stage_Model");
const asyncHandler = require("express-async-handler");

// Deal Functions
const createDeal = asyncHandler(async (req, res) => {
  const newDeal = new Deal_Model(req.body);
  const deal = await newDeal.save();

  const stage = await Stage_Model.findById(req.body.currentStage);
  stage.items.push(deal._id);
  await stage.save();

  const pipeline = await Pipeline_Model.findById(stage.pipelineId);
  pipeline.deals.push(deal._id);
  await pipeline.save();

  res.status(200).json({ message: "Deal has been created", data: deal });
});

const getDeal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deal = await Deal_Model.findById(id);
  res.status(200).json({ data: deal });
});
const getDeals = asyncHandler(async (req, res) => {
  const { filters, search, sort, limit, select, count, start, data } =
    req.query;

  let deals;
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
    deals = await Deal_Model.find(filtersObj)
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }
  if (count) {
    total = await Deal_Model.count(filtersObj)
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }
  if (search) {
    deals = await Deal_Model.find({ $text: { $search: search } })
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }

  res.status(200).json({ data: deals, meta: { total } });
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
  // let isExists = false;
  // deal.stages.forEach((stage) => {
  //   if (stage.id === newStageId) {
  //     stage.active = true;
  //     isExists = true;
  //   } else {
  //     stage.active = false;
  //   }
  // });
  // !isExists && deal.stages.push({ _id: newStageId });
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
  await deleteFiles(deal.id);
  await deleteActivities(deal.id);
  await deleteNotes(deal.id);

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
