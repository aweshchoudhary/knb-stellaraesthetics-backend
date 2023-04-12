const mongoose = require("mongoose");

const Note_Schema = new mongoose.Schema(
  {
    body: String,
    cardId: String,
  },
  { timestamps: true }
);

const Note_Model = mongoose.model("Note", Note_Schema);
module.exports = Note_Model;
