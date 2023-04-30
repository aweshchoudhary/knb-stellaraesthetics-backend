const mongoose = require("mongoose");

const Call_Schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    type: String,
    startDateTime: Date,
    endDateTime: Date,
    caller: String,
    receiver: String,
    dealId: [String],
    involved_contacts: [String],
    involved_users: [String],
    completed_on: Date,
  },
  { timestamps: true }
);

const Call_Model = mongoose.model("Call", Call_Schema);
module.exports = Call_Model;
