const mongoose = require("mongoose");

const Deal_Schema = new mongoose.Schema(
  {
    title: String,
    desc: String,
    value: Number,
    currency: String,
    currentStage: String,
    label: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Label",
    },
    expectedClosingDate: Date,
    status: { type: String, default: "open" },
    pipelineId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Pipeline",
    },
    contacts: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Contact" },
    ],
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "DealItem",
      },
    ],
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Note",
      },
    ],
    activities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Activity",
      },
    ],
    files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "File",
      },
    ],
    mails: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Mail",
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

Deal_Schema.index({
  title: "text",
  contacts: "text",
});

const Deal_Model = mongoose.model("Deal", Deal_Schema);
module.exports = Deal_Model;
