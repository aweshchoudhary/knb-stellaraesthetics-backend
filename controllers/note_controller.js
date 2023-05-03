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
  const note = await Note_Model.findById(id);
  res.status(200).json({ data: note });
});

const addNote = asyncHandler(async (req, res) => {
  const { cardId, noteBody } = req.body;
  const newNote = new Note_Model({
    body: noteBody,
    cardId,
  });
  const note = await newNote.save();
  res.status(200).json({ message: "Note has been added to card", data: note });
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
