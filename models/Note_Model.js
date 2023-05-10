const mongoose = require("mongoose");

const Note_Schema = new mongoose.Schema(
  {
    body: String,
    deals: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Deal" },
    ],
    contacts: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Contact" },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Note_Model = mongoose.model("Note", Note_Schema);
module.exports = Note_Model;
