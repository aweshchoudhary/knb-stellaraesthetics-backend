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
  searchCards,
  getCardsByClientId,
} = require("../controllers/deal_controller");
const {
  addActivity,
  updateActivity,
  deleteActivity,
  getActivitiesByCardId,
  getActivityById,
  getAllActivities,
  getActivitiesByClient,
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
} = require("../controllers/contacts_controller");
const {
  createPipeline,
  getAllPipelines,
  getPipelineById,
  updatePipeline,
  deletePipelineById,
} = require("../controllers/pipline_controller");
const {
  addFile,
  downloadFile,
  deleteFile,
  getAllFileInfo,
} = require("../controllers/file_controller");
const upload = require("../apps/multer");

// PIPELINE ENDPOINTS
router.post("/pipeline/add", createPipeline);
router.get("/pipeline/get-pipelines/", getAllPipelines);
router.get("/pipeline/get-pipeline/:id", getPipelineById);
router.put("/pipeline/update/:id", updatePipeline);
router.delete("/pipeline/delete/:id", deletePipelineById);

// STAGE ENDPOINTS
router.post("/stage/add", createStage);
router.get("/stage/get-stages/:id", getAllStages);
router.get("/stage/get-stage", getStageById);
router.put("/stage/reorder/:pipelineId", reorderStages);
router.put("/stage/update/:id", updateStage);
router.delete("/stage/:pipelineId/:position", deleteStage);

// CARD ENDPOINTS
router.get("/deal/get-deal/:id", getCard);
router.get("/deal/get-deals/:stageId", getCardsByStage);
router.get("/deal/get-deals-by-contact/:contactId", getCardsByClientId);
router.get("/deal/search", searchCards);
router.post("/deal/add", createCard);
router.delete("/deal/delete/:id", deleteCard);
router.put("/deal/update/:id", updateCard);
router.put("/deal/deal-stage", updateCardStage);

// NOTE ENDPOINTS
router.post("/note/add", addNote);
router.put("/note/update/:id", updateNote);
router.delete("/note/delete/:id", deleteNote);
router.get("/note/get-notes/:dealId", getNotesByCardId);
router.get("/note/get-note/:id", getNotesById);

// ACTIVITY ENDPOINTS
router.post("/activity/add", addActivity);
router.put("/activity/update/:id", updateActivity);
router.delete("/activity/delete/:id", deleteActivity);
router.get("/activity/get-all-activities", getAllActivities);
router.get("/activity/get-activities/:dealId", getActivitiesByCardId);
router.get("/activity/get-activity/:id", getActivityById);
router.get(
  "/activity/get-activities-by-contact/:contactId",
  getActivitiesByClient
);

// LABEL ENDPOINTS
router.post("/label/add", createLabel);
router.put("/label/update/:id", updateLabel);
router.delete("/label/delete/:id", deleteLabel);
router.get("/label/get-labels", getLabels);
router.get("/label/get-label/:id", getLabelById);

// CLIENT ENDPOINTS
router.post("/contact/add", createClient);
router.put("/contact/update/:id", updateClient);
router.delete("/contact/delete/:id", deleteClient);
router.get("/contact/get-contacts", getClients);
router.get("/contact/get-contact/:id", getClientById);

router.post("/file/add", upload.single("file"), addFile);
router.get("/file/get-fileinfos/:dealId", getAllFileInfo);
router.get("/file/download/:filename", downloadFile);
router.delete("/file/delete/:fileId", deleteFile);

module.exports = router;
