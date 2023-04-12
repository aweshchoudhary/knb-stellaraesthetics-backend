const mongoose = require("mongoose");

const Activity_Schema = new mongoose.Schema(
  {
    title: String,
    type: String,
    startDate: Date,
    startTime: String,
    endDate: Date,
    endTime: String,
    description: String,
    location: String,
    holder: String,
    cardId: String,
    markDone: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Activity_Model = mongoose.model("Activity", Activity_Schema);
module.exports = Activity_Model;
