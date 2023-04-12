const Stage_Model = require("../models/Stage_Model");
const Card_Model = require("../models/Card_Model");
const asyncHandler = require("express-async-handler");

// Card Functions
const createCard = asyncHandler(async (req, res) => {
  const newCard = new Card_Model({
    ...req.body,
    stage: [
      {
        _id: req.body.stage,
      },
    ],
  });
  const card = await newCard.save();
  await Stage_Model.findByIdAndUpdate(req.body.stage, {
    $push: { items: card._id },
  });
  res.status(200).json({ message: "Card has been created", data: card });
});
const getCard = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const card = await Card_Model.findById(id);
  res.status(200).json({ data: card });
});
const updateCardStage = asyncHandler(async (req, res) => {
  const { newStageId, prevStageId, cardId } = req.body;
  // Remove card id from previous stage
  await Stage_Model.findByIdAndUpdate(prevStageId, {
    $pull: { items: cardId },
  });
  // add card id to new stage
  await Stage_Model.findByIdAndUpdate(newStageId, {
    $push: { items: cardId },
  });
  // update card stage
  const card = await Card_Model.findById(cardId);
  let isExists = false;
  card.stages.forEach((stage) => {
    if (stage.id === newStageId) {
      stage.active = true;
      isExists = true;
    } else {
      stage.active = false;
    }
  });
  !isExists && card.stages.push({ _id: newStageId });
  await card.save();

  res.status(200).json({ message: "stage has been changed" });
});
const getCardsByStage = asyncHandler(async (req, res) => {
  const { stage } = req.query;
  const cards = await Card_Model.find({ stage });
  res.status(200).json({ data: cards });
});
const updateCard = asyncHandler(async (req, res) => {
  const { id, update } = req.body;
  await Card_Model.findByIdAndUpdate(id, { ...update });
  res.status(200).json({ message: "Card Has Been Updated" });
});
const deleteCard = asyncHandler(async (req, res) => {
  const { id } = req.query;
  await Card_Model.findByIdAndDelete(id);
  res.status(200).json({ message: "Card Has Been Deleted" });
});

module.exports = {
  getCard,
  getCardsByStage,
  updateCardStage,
  createCard,
  updateCard,
  deleteCard,
};
