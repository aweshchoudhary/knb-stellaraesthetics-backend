const mongoose = require("mongoose");

const Deal_Schema = new mongoose.Schema(
  {
    title: String,
    desc: String,
    // value: Number,
    // currency: String,
    product_service: [String],
    currentStage: String,
    history: {},
    label: String,
    status: { type: String, default: "open" },
    pipelineId: String,
    expectedClosingDate: Date,
    contacts: [String],
    owner: String,
    assingees: [String],
  },
  { timestamps: true }
);

Deal_Schema.index({
  title: "text",
  contacts: "text",
});

const Deal_Model = mongoose.model("Deal", Deal_Schema);
module.exports = Deal_Model;
