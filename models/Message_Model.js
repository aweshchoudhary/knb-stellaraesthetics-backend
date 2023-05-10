const mongoose = require("mongoose");

const File_Schema = new mongoose.Schema(
  {
    startDateTime: String,
    endDateTime: String,
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Contact",
    },
    from_me: Boolean,
    dealId: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Deal" },
    ],
  },
  { timestamps: true }
);

const File_Model = mongoose.model("File", File_Schema);
module.exports = File_Model;
