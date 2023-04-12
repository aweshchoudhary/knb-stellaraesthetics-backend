const mongoose = require("mongoose");

const Mail_Schema = new mongoose.Schema(
  {
    mailId: String,
    senderEmail: String,
    receiverEmail: String,
    Subject: String,
  },
  { timestamps: true }
);

const Mail_Model = mongoose.model("Mail", Mail_Schema);
module.exports = Mail_Model;
