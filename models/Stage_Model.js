const mongoose = require("mongoose");

const Stage_Schema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [String],
  position: { type: Number, default: 1, required: true },
});

const Stage_Model = mongoose.model("Stage", Stage_Schema);

module.exports = Stage_Model;
