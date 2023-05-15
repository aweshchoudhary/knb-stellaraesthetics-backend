const mongoose = require("mongoose");

const File_Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    size: { type: String, required: true },
    type: { type: String, required: true },
    url: { type: String, required: true },
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sent_to_contacts: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
    ],
    sent_to_users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dealId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Deal" }],
    contactId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
  },
  { timestamps: true }
);

const File_Model = mongoose.model("File", File_Schema);
module.exports = File_Model;
