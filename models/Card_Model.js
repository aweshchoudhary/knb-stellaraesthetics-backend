const mongoose = require("mongoose");

const Value_Schema = new mongoose.Schema({
  value: Number,
  type: String,
});

const Card_Schema = new mongoose.Schema(
  {
    contacts: [String],
    title: String,
    value: Value_Schema,
    currentStage: String,
    label: String,
    expectedClosingDate: Date,
  },
  { timestamps: true }
);

Card_Schema.index({
  title: "text",
  contacts: "text",
});

const Card_Model = mongoose.model("Card", Card_Schema);
module.exports = Card_Model;
