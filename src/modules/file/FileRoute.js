const router = require("express").Router();
const {
  addFile,
  downloadFile,
  deleteFile,
  getAllFileInfo,
} = require("./FileController");

const upload = require("../../apps/multer");

router.post("/add", upload.single("file"), addFile);
router.get("/get-files", getAllFileInfo);
router.get("/download/:filename", downloadFile);
router.delete("/delete/:fileId", deleteFile);

module.exports = router;
