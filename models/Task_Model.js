const mongoose = require("mongoose");

const Activity_Schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    type: String,
    startDateTime: Date,
    endDateTime: Date,
    location: String,
    performer: String,
    dealId: [String],
    contactId: String,
    involved_contacts: [String],
    involved_users: [String],
    completed_on: Date,
  },
  { timestamps: true }
);

const Activity_Model = mongoose.model("Activity", Activity_Schema);
module.exports = Activity_Model;
