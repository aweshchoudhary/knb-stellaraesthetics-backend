const mongoose = require("mongoose");

const File_Schema = new mongoose.Schema(
  {
    name: String,
    size: Number,
    type: String,
  },
  { timestamps: true }
);

const File_Model = mongoose.model("File", File_Schema);
module.exports = File_Model;
