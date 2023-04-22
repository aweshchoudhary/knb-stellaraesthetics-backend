const mongoose = require("mongoose");

const File_Schema = new mongoose.Schema(
  {
    name: String,
    size: Number,
    type: String,
    url: String,
    cardId: String,
  },
  { timestamps: true }
);

const File_Model = mongoose.model("File", File_Schema);
module.exports = File_Model;
