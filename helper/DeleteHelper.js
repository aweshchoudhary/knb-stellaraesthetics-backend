const Pipeline_Model = require("../models/Pipeline_Model");
const Stage_Model = require("../models/Stage_Model");
const Deal_Model = require("../models/Deal_Model");
const File_Model = require("../models/File_Model");
const Activity_Model = require("../models/Activity_Model");
const Note_Model = require("../models/Note_Model");

async function deletePipeline(id) {
  const pipeline = await Pipeline_Model.findById(id).select("_id");
  await deleteStages(pipeline.id);
  await pipeline.deleteOne();
}

async function deleteStages(pipelineId) {
  const stages = await Stage_Model.find({ pipelineId }).select("_id");
  stages.length > 0 &&
    stages.forEach(async (stage) => {
      await deleteDeals(stage.id);
      await stage.deleteOne();
    });
}

async function deleteDeals(stageId) {
  const cards = await Deal_Model.find({ currentStage: stageId });

  cards.length > 0 &&
    cards.forEach(async (card) => {
      await deleteFiles(card.id);
      await deleteActivities(card.id);
      await deleteNotes(card.id);
      await card.deleteOne();
    });
}

async function deleteFiles(cardId) {
  await File_Model.deleteMany({ cardId });
}
async function deleteActivities(cardId) {
  await Activity_Model.deleteMany({ cardId });
}
async function deleteNotes(cardId) {
  await Note_Model.deleteMany({ cardId });
}

module.exports = {
  deletePipeline,
  deleteStages,
  deleteDeals,
  deleteFiles,
};
