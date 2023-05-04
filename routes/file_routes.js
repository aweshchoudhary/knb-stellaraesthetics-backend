const router = require("express").Router();
const {
  addFile,
  downloadFile,
  deleteFile,
  getAllFileInfo,
} = require("../controllers/file_controller");

const upload = require("../apps/multer");

router.post("/add", upload.single("file"), addFile);
router.get("/get-fileinfos/:dealId", getAllFileInfo);
router.get("/download/:filename", downloadFile);
router.delete("/delete/:fileId", deleteFile);

module.exports = router;
