const mongoose = require("mongoose");

const Activity_Schema = new mongoose.Schema(
  {
    title: String,
    type: String,
    startDateTime: Date,
    endDateTime: Date,
    description: String,
    location: String,
    holder: String,
    cardId: [String],
    clientId: String,
    markDone: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Activity_Model = mongoose.model("Activity", Activity_Schema);
module.exports = Activity_Model;
