const mongoose = require("mongoose");

const File_Schema = new mongoose.Schema(
  {
    startDateTime: String,
    endDateTime: String,
    user: String,
    contact: String,
    from_me: Boolean,
    dealId: [String],
  },
  { timestamps: true }
);

const File_Model = mongoose.model("File", File_Schema);
module.exports = File_Model;
