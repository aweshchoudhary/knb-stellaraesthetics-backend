const mongoose = require("mongoose");

const Stage_Schema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: String,
  deals: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Deal" },
  ],
  position: { type: Number, default: 1, required: true },
  pipelineId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Pipeline",
  },
});

const Stage_Model = mongoose.model("Stage", Stage_Schema);

module.exports = Stage_Model;
