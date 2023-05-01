const Stage_Model = require("../models/Stage_Model");
const Deal_Model = require("../models/Deal_Model");
const asyncHandler = require("express-async-handler");

// Deal Functions
const createDeal = asyncHandler(async (req, res) => {
  const newDeal = new Deal_Model(req.body);
  const card = await newDeal.save();
  await Stage_Model.findByIdAndUpdate(req.body.stage, {
    $push: { items: card._id },
  });
  res.status(200).json({ message: "Deal has been created", data: card });
});

const getDeal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const card = await Deal_Model.findById(id);
  res.status(200).json({ data: card });
});

const searchDeals = asyncHandler(async (req, res) => {
  const { query } = req.query;
  const cards = await Deal_Model.find({
    $text: { $search: query },
  });
  res.status(200).json({ data: cards });
});
const getDealsByStage = asyncHandler(async (req, res) => {
  const { stageId } = req.params;
  const cards = await Deal_Model.find({ currentStage: stageId }).lean();
  res.status(200).json({ data: cards });
});

const getDealsByContactId = asyncHandler(async (req, res) => {
  const { clientId } = req.params;
  const cards = await Deal_Model.find({ contacts: { $in: clientId } }).lean();
  res.status(200).json({ data: cards });
});

const updateDealStage = asyncHandler(async (req, res) => {
  const { newStageId, prevStageId, cardId } = req.body;
  // // Remove card id from previous stage
  // await Stage_Model.findByIdAndUpdate(prevStageId, {
  //   $pull: { items: cardId },
  // });
  // // add card id to new stage
  // await Stage_Model.findByIdAndUpdate(newStageId, {
  //   $push: { items: cardId },
  // });
  // update card stage
  const card = await Deal_Model.findById(cardId);
  card.currentStage = newStageId;
  // let isExists = false;
  // card.stages.forEach((stage) => {
  //   if (stage.id === newStageId) {
  //     stage.active = true;
  //     isExists = true;
  //   } else {
  //     stage.active = false;
  //   }
  // });
  // !isExists && card.stages.push({ _id: newStageId });
  await card.save();
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
  getDealsByStage,
  getDealsByContactId,
  searchDeals,
  updateDealStage,
  createDeal,
  updateDeal,
  deleteDeal,
};
