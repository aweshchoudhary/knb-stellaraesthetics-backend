const mongoose = require("mongoose");

const File_Schema = new mongoose.Schema(
  {
    name: String,
    size: Number,
    type: String,
    url: String,
    uploader: String,
    sent_to_contacts: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Contact" },
    ],
    sent_to_users: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    ],
    dealId: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Deal" },
    ],
  },
  { timestamps: true }
);

const File_Model = mongoose.model("File", File_Schema);
module.exports = File_Model;
