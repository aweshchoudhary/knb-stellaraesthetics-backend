const mongoose = require("mongoose");

const Note_Schema = new mongoose.Schema(
  {
    body: String,
    cardId: { type: String, required: true },
  },
  { timestamps: true }
);

const Note_Model = mongoose.model("Note", Note_Schema);
module.exports = Note_Model;
