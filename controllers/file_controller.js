const asyncHandler = require("express-async-handler");
const File_Model = require("../models/File_Model");
const fs = require("fs");
const path = require("path");

const getAllFileInfo = asyncHandler(async (req, res) => {
  const { cardId } = req.params;
  const { populate } = req.query;

  const fileInfos = await File_Model.find({ cardId }).populate(populate);
  res.status(200).json({ data: fileInfos });
});
const addFile = asyncHandler(async (req, res) => {
  const { filename, path, size, mimetype } = req.file;
  const newFile = new File_Model({
    name: filename,
    type: mimetype,
    url: path,
    size,
    ...req.body,
  });
  const fileInfo = await newFile.save();
  res
    .status(200)
    .json({ message: "File has been attached to card", data: fileInfo });
});
const downloadFile = asyncHandler(async (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../public/uploads/", filename);
  res.status(200).sendFile(filePath);
});
const deleteFile = asyncHandler(async (req, res) => {
  const { fileId } = req.params;
  const fileInfo = await File_Model.findById(fileId);
  fs.unlink("public/uploads/" + fileInfo.name, async () => {
    await fileInfo.deleteOne();
  });
  res.status(200).json({ message: "File has been deleted" });
});

module.exports = {
  addFile,
  downloadFile,
  deleteFile,
  getAllFileInfo,
};
