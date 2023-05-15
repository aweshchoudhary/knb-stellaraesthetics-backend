const asyncHandler = require("express-async-handler");
const FileModel = require("./FileModel");
const fs = require("fs");
const path = require("path");

const getAllFileInfo = asyncHandler(async (req, res) => {
  const { filters, search, sort, limit, select, count, start, data, populate } =
    req.query;

  const filtersObj = filters
    ? JSON.parse(filters).reduce(
        (obj, item) => ({ ...obj, [item.id]: item.value }),
        {}
      )
    : {};
  const sortObj = sort
    ? JSON.parse(sort).reduce(
        (obj, item) => ({ ...obj, [item.id]: item.desc ? "desc" : "asc" }),
        {}
      )
    : {};

  const buildQuery = (model, filtersObj, limit, select, sortObj, start) => {
    return model
      .find(filtersObj)
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0)
      .populate(populate);
  };

  let files;
  let total = 0;

  const queries = [];

  if (data) {
    queries.push(
      buildQuery(FileModel, filtersObj, limit, select, sortObj, start, populate)
    );
  }

  if (count) {
    queries.push(
      FileModel.countDocuments(filtersObj)
        .limit(limit || 25)
        .select(select)
        .sort(sortObj)
        .skip(start || 0)
        .then((count) => {
          total = count;
        })
    );
  }

  if (search) {
    queries.push(
      buildQuery(
        FileModel,
        { $text: { $search: search } },
        limit,
        select,
        sortObj,
        start,
        populate
      )
    );
  }

  await Promise.all(queries)
    .then((results) => {
      if (data) {
        [files] = results;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  res.status(200).json({ data: files, meta: { total } });
});
const addFile = asyncHandler(async (req, res) => {
  const { filename, path, size, mimetype } = req.file;
  const newFile = new FileModel({
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
  const fileInfo = await FileModel.findById(fileId);
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
