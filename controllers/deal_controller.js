const Stage_Model = require("../models/Stage_Model");
const Deal_Model = require("../models/Deal_Model");
const asyncHandler = require("express-async-handler");

// Deal Functions
const createDeal = asyncHandler(async (req, res) => {
  const newDeal = new Deal_Model(req.body);
  const deal = await newDeal.save();
  await Stage_Model.findByIdAndUpdate(req.body.stage, {
    $push: { items: deal._id },
  });
  res.status(200).json({ message: "Deal has been created", data: deal });
});

const getDeal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deal = await Deal_Model.findById(id);
  res.status(200).json({ data: deal });
});
const getDeals = asyncHandler(async (req, res) => {
  const { filters, search, sort, limit, select, count, start } = req.query;

  let deals;
  if (data) {
    deals = await Deal_Model.find(filters || {})
      .limit(limit || 25)
      .select(select)
      .sort(sort)
      .skip(start || 0);
  }
  if (count) {
    deals = await Deal_Model.count(filters || search || {})
      .limit(limit || 25)
      .select(select)
      .sort(sort)
      .skip(start || 0);
  }
  if (search) {
    deals = await Deal_Model.find({ $text: { $search: search } })
      .limit(limit || 25)
      .select(select)
      .sort(sort)
      .skip(start || 0);
  }
  res.status(200).json({ data: deals });
});

const updateDealStage = asyncHandler(async (req, res) => {
  const { newStageId, prevStageId, cardId } = req.body;
  // // Remove deal id from previous stage
  await Stage_Model.findByIdAndUpdate(prevStageId, {
    $pull: { items: cardId },
  });
  // add deal id to new stage
  await Stage_Model.findByIdAndUpdate(newStageId, {
    $push: { items: cardId },
  });
  // update deal stage
  const deal = await Deal_Model.findById(cardId);
  deal.currentStage = newStageId;
  let isExists = false;
  deal.stages.forEach((stage) => {
    if (stage.id === newStageId) {
      stage.active = true;
      isExists = true;
    } else {
      stage.active = false;
    }
  });
  !isExists && deal.stages.push({ _id: newStageId });
  await deal.save();
  res.status(200).json({ message: "stage has been changed" });
});
const updateDeal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { update } = req.body;
  await Deal_Model.findByIdAndUpdate(id, { ...update });
  res.status(200).json({ message: "Deal Has Been Updated" });
});

const deleteDeal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Deal_Model.findByIdAndDelete(id);
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
