const mongoose = require("mongoose");

const PipelineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: String,
    stages: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Stage" },
    ],
    deals: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Deal" },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    assignees: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    ],
  },
  { timestamps: true }
);

PipelineSchema.index({
  name: "text",
});

const PiplineModel = mongoose.model("Pipeline", PipelineSchema);

module.exports = PiplineModel;
