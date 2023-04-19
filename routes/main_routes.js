const router = require("express").Router();
const {
  getAllStages,
  createStage,
  updateStage,
  deleteStage,
  getStageById,
  reorderStages,
} = require("../controllers/stage_controller");
const {
  getCard,
  createCard,
  deleteCard,
  updateCard,
  updateCardStage,
  getCardsByStage,
} = require("../controllers/card_controller");
const {
  addActivity,
  updateActivity,
  deleteActivity,
  getActivitiesByCardId,
  getActivityById,
  getAllActivities,
} = require("../controllers/activity_controller");
const {
  addNote,
  updateNote,
  deleteNote,
  getNotesByCardId,
  getNotesById,
} = require("../controllers/note_controller");
const {
  createLabel,
  getLabelById,
  getLabels,
  updateLabel,
  deleteLabel,
} = require("../controllers/label_controller");
const {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/clients_controller");
const {
  createPipeline,
  getAllPipelines,
  getPipelineById,
  updatePipeline,
  deletePipeline,
} = require("../controllers/pipline_controller");
const upload = require("../apps/multer");

// PIPELINE ENDPOINTS
router.post("/pipeline/add", createPipeline);
router.get("/pipeline/get-pipelines/", getAllPipelines);
router.get("/pipeline/get-pipeline/:id", getPipelineById);
router.put("/pipeline/update/:id", updatePipeline);
router.delete("/pipeline/:position", deletePipeline);

// STAGE ENDPOINTS
router.post("/stage/add", createStage);
router.get("/stage/get-stages/:id", getAllStages);
router.get("/stage/get-stage", getStageById);
router.put("/stage/reorder", reorderStages);
router.put("/stage/update/:id", updateStage);
router.delete("/stage/:position", deleteStage);

// CARD ENDPOINTS
router.get("/card/get-card/:id", getCard);
router.get("/card/get-cards/:stageId", getCardsByStage);
router.post("/card/add", createCard);
router.delete("/card/delete/:id", deleteCard);
router.put("/card/update/:id", updateCard);
router.put("/card/card-stage", updateCardStage);

// NOTE ENDPOINTS
router.post("/note/add", addNote);
router.put("/note/update/:id", updateNote);
router.delete("/note/delete/:id", deleteNote);
router.get("/note/get-notes/:cardId", getNotesByCardId);
router.get("/note/get-note/:id", getNotesById);

// ACTIVITY ENDPOINTS
router.post("/activity/add", addActivity);
router.put("/activity/update/:id", updateActivity);
router.delete("/activity/delete/:id", deleteActivity);
router.get("/activity/get-all-activities", getAllActivities);
router.get("/activity/get-activities/:cardId", getActivitiesByCardId);
router.get("/activity/get-activity/:id", getActivityById);

// LABEL ENDPOINTS
router.post("/label/add", createLabel);
router.put("/label/update/:id", updateLabel);
router.delete("/label/delete/:id", deleteLabel);
router.get("/label/get-labels", getLabels);
router.get("/label/get-label/:id", getLabelById);

// CLIENT ENDPOINTS
router.post("/client/add", createClient);
router.put("/client/update/:id", updateClient);
router.delete("/client/delete/:id", deleteClient);
router.get("/client/get-clients", getClients);
router.get("/client/get-client/:id", getClientById);

// router.post("/file/add", upload.single("file"), addFile);
// router.put("/file/download", getFile);
// router.delete("/file/delete", deleteFile);

module.exports = router;
