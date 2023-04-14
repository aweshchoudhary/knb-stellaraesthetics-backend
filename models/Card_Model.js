const mongoose = require("mongoose");

const Value_Schema = new mongoose.Schema({
  value: Number,
  type: String,
});

const Stage_Schema = new mongoose.Schema(
  {
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Card_Schema = new mongoose.Schema(
  {
    clientId: String,
    title: String,
    value: Value_Schema,
    stages: [Stage_Schema],
    label: String,
    expectedClosingDate: Date,
  },
  { timestamps: true }
);

const Card_Model = mongoose.model("Card", Card_Schema);
module.exports = Card_Model;
