const mongoose = require("mongoose");

const Note_Schema = new mongoose.Schema(
  {
    body: String,
    dealId: [{ type: String, required: true }],
    creator: String,
  },
  { timestamps: true }
);

const Note_Model = mongoose.model("Note", Note_Schema);
module.exports = Note_Model;
