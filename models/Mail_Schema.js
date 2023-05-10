const mongoose = require("mongoose");

const Mail_Schema = new mongoose.Schema(
  {
    mailId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Deal",
    },
    senderEmail: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Deal",
    },
    receiverEmail: String,
    Subject: String,
  },
  { timestamps: true }
);

const Mail_Model = mongoose.model("Mail", Mail_Schema);
module.exports = Mail_Model;
