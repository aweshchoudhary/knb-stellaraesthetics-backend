const mongoose = require("mongoose");

const Activity_Schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    type: String,
    startDateTime: Date,
    endDateTime: Date,
    location: String,
    performer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    dealId: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Deal" },
    ],
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Contact",
    },
    involved_contacts: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "COntact" },
    ],
    involved_users: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    ],
    completed_on: Date,
  },
  { timestamps: true }
);

const Activity_Model = mongoose.model("Activity", Activity_Schema);
module.exports = Activity_Model;
