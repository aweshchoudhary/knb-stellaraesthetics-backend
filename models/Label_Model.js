const mongoose = require("mongoose");

const Label_Schema = new mongoose.Schema(
  {
    name: String,
    color: String,
  },
  { timestamps: true }
);

const Label_Model = mongoose.model("Label", Label_Schema);
module.exports = Label_Model;
