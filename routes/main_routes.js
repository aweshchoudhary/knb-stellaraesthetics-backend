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

const upload = require("../apps/multer");

// STAGE ENDPOINTS
router.post("/stage", createStage);
router.get("/get-stages", getAllStages);
router.get("/get-stage", getStageById);
router.put("/stage/reorder", reorderStages);
router.put("/stage/:id", updateStage);
router.delete("/stage/:position", deleteStage);

// CARD ENDPOINTS
router.get("/get-card", getCard);
router.get("/get-cards", getCard);
router.post("/card", createCard);
router.delete("/card", deleteCard);
router.put("/card", updateCard);
router.put("/update-card-stage", updateCardStage);

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
