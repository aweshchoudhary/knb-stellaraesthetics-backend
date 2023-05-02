const router = require("express").Router();
const {
  getStages,
  createStage,
  updateStage,
  deleteStage,
  getStageById,
  reorderStages,
} = require("../controllers/stage_controller");
const {
  getDeal,
  createDeal,
  deleteDeal,
  updateDeal,
  updateDealStage,
  getDeals,
} = require("../controllers/deal_controller");
const {
  addActivity,
  updateActivity,
  deleteActivity,
  getActivityById,
  getActivities,
} = require("../controllers/activity_controller");
const {
  addNote,
  updateNote,
  deleteNote,
  getNotes,
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
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controllers/contacts_controller");
const {
  createPipeline,
  getPipelines,
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
router.get("/pipeline/get-pipelines/", getPipelines);
router.get("/pipeline/get-pipeline/:id", getPipelineById);
router.put("/pipeline/update/:id", updatePipeline);
router.delete("/pipeline/delete/:id", deletePipelineById);

// STAGE ENDPOINTS
router.post("/stage/add", createStage);
router.get("/stage/get-stages", getStages);
router.put("/stage/reorder/:pipelineId", reorderStages);
router.put("/stage/update/:id", updateStage);
router.delete("/stage/:pipelineId/:position", deleteStage);

// CARD ENDPOINTS
router.get("/deal/get-deal/:id", getDeal);
router.get("/deal/get-deals", getDeals);
router.post("/deal/add", createDeal);
router.delete("/deal/delete/:id", deleteDeal);
router.put("/deal/update/:id", updateDeal);
router.put("/deal/deal-stage", updateDealStage);

// NOTE ENDPOINTS
router.post("/note/add", addNote);
router.put("/note/update/:id", updateNote);
router.delete("/note/delete/:id", deleteNote);
router.get("/note/get-notes", getNotes);
router.get("/note/get-note/:id", getNotesById);

// ACTIVITY ENDPOINTS
router.post("/activity/add", addActivity);
router.put("/activity/update/:id", updateActivity);
router.delete("/activity/delete/:id", deleteActivity);
router.get("/activity/get-activity/:id", getActivityById);
router.get("/activity/get-activities", getActivities);

// LABEL ENDPOINTS
router.post("/label/add", createLabel);
router.put("/label/update/:id", updateLabel);
router.delete("/label/delete/:id", deleteLabel);
router.get("/label/get-labels", getLabels);
router.get("/label/get-label/:id", getLabelById);

// CLIENT ENDPOINTS
router.post("/contact/add", createContact);
router.put("/contact/update/:id", updateContact);
router.delete("/contact/delete/:id", deleteContact);
router.get("/contact/get-contacts", getContacts);
router.get("/contact/get-contact/:id", getContactById);

router.post("/file/add", upload.single("file"), addFile);
router.get("/file/get-fileinfos/:dealId", getAllFileInfo);
router.get("/file/download/:filename", downloadFile);
router.delete("/file/delete/:fileId", deleteFile);

module.exports = router;
