const verifyPipelineUser = require("../middlewares/verifyPipelineUser");
const Note_Model = require("../models/Note_Model");
const asyncHandler = require("express-async-handler");

// NOTES CONTROLLERS

const getNotes = asyncHandler(async (req, res) => {
  const { filters, search, sort, limit, select, count, start, data } =
    req.query;

  let notes;
  let total = 0;
  let sortObj;
  let filtersObj = {};

  if (filters) {
    const filtersArr = JSON.parse(filters);
    filtersArr.forEach((item) => {
      filtersObj = {
        ...filtersObj,
        [item.id]: item.value,
      };
    });
  }
  if (sort) {
    const sortArr = JSON.parse(sort);
    sortArr.forEach((item) => {
      sortObj = {
        ...sortObj,
        [item.id]: item.desc ? "desc" : "asc",
      };
    });
  }
  if (data) {
    notes = await Note_Model.find(filtersObj)
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }
  if (count) {
    total = await Note_Model.count(filtersObj)
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }
  if (search) {
    notes = await Note_Model.find({ $text: { $search: search } })
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }
  res.status(200).json({ data: notes, meta: { total } });
});

const getNotesById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { select, populate } = req.query;

  if (!id) {
    return res.status(400).json({ success: false, message: "Missing note ID" });
  }

  const note = await Note_Model.findById(id).populate(populate).select(select);

  if (!note) {
    return res
      .status(404)
      .json({ success: false, message: "Activity not found" });
  }

  res.status(200).json({ success: true, data: note });
});
const addNote = asyncHandler(async (req, res) => {
  const { deals, noteBody, pipelineId } = req.body;
  const user = req.user;
  const { pipeId } = await verifyPipelineUser(pipelineId, user._id);
  console.log(pipelineId);
  if (!pipeId)
    return res
      .status(401)
      .json({ message: "You don't have access to this pipeline" });

  const newNote = new Note_Model({
    body: noteBody,
    deals,
  });

  const note = await newNote.save();
  res.status(200).json({ message: "Note has been added to deal", data: note });
});
const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { noteBody } = req.body;
  await Note_Model.findByIdAndUpdate(id, {
    body: noteBody,
  });
  res.status(200).json({ message: "Note has been updated" });
});
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Note_Model.findByIdAndDelete(id);
  res.status(200).json({ message: "Note has been deleted" });
});

module.exports = {
  addNote,
  updateNote,
  deleteNote,
  getNotes,
  getNotesById,
};
