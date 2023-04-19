const mongoose = require("mongoose");

const PipelineSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const PiplineModel = mongoose.model("Pipeline", PipelineSchema);

module.exports = PiplineModel;
