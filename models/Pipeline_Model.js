const mongoose = require("mongoose");

const PipelineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: String,
    stages: [String],
    deals: [String],
    product_service: String,
    owner: { type: String, required: true },
    assignees: [String],
  },
  { timestamps: true }
);

PipelineSchema.index({
  name: "text",
});

const PiplineModel = mongoose.model("Pipeline", PipelineSchema);

module.exports = PiplineModel;
