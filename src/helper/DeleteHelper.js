const {
  PipelineModel,
  StageModel,
  DealModel,
  FileModel,
  ActivityModel,
  NoteModel,
} = require("../modules/models");
const fs = require("fs");

async function deletePipeline(id) {
  const pipeline = await PipelineModel.findById(id).select("_id");
  await deleteStages(pipeline.id);
  await pipeline.deleteOne();
}

async function deleteStages(pipelineId) {
  const stages = await StageModel.find({ pipelineId }).select("_id");
  stages.length > 0 &&
    stages.forEach(async (stage) => {
      await deleteDeals(stage.id);
      await stage.deleteOne();
    });
}

async function deleteDeals(stageId) {
  const cards = await DealModel.find({ currentStage: stageId });

  cards.length > 0 &&
    cards.forEach(async (card) => {
      await deleteFiles(card.id);
      await deleteActivities(card.id);
      await deleteNotes(card.id);
      await card.deleteOne();
    });
}

async function deleteFiles(cardId) {
  const files = await FileModel.find({ cardId });
  files.forEach(async (file) => {
    fs.unlink("public/uploads/" + file.name, async () => {
      await file.deleteOne();
    });
  });
}
async function deleteActivities(cardId) {
  await ActivityModel.deleteMany({ cardId });
}
async function deleteNotes(cardId) {
  await NoteModel.deleteMany({ cardId });
}

module.exports = {
  deletePipeline,
  deleteStages,
  deleteDeals,
  deleteFiles,
  deleteActivities,
  deleteNotes,
};
