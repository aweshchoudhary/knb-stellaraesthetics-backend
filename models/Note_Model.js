const mongoose = require("mongoose");

const Note_Schema = new mongoose.Schema(
  {
    body: String,
    deals: [{ type: String, required: true }],
    contacts: [{ type: String, required: true }],
    creator: { type: String, required: true },
  },
  { timestamps: true }
);

const Note_Model = mongoose.model("Note", Note_Schema);
module.exports = Note_Model;
