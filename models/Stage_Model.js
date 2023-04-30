const mongoose = require("mongoose");

const Stage_Schema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: String,
  items: [String],
  position: { type: Number, default: 1, required: true },
  pipelineId: { type: String, required: true },
});

const Stage_Model = mongoose.model("Stage", Stage_Schema);

module.exports = Stage_Model;
