const mongoose = require("mongoose");

const Call_Schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    type: String,
    startDateTime: Date,
    endDateTime: Date,
    caller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Contact",
    },
    dealId: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Deal" },
    ],
    involved_contacts: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Contact" },
    ],
    involved_users: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    ],
    completed_on: Date,
  },
  { timestamps: true }
);

const Call_Model = mongoose.model("Call", Call_Schema);
module.exports = Call_Model;
