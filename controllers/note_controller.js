const Note_Model = require("../models/Note_Model");
const asyncHandler = require("express-async-handler");

// NOTES CONTROLLERS

const getNotesByCardId = asyncHandler(async (req, res) => {
  const { cardId } = req.params;
  const notes = await Note_Model.find({ cardId });
  res.status(200).json({ data: notes });
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
  getNotesByCardId,
  getNotesById,
};
