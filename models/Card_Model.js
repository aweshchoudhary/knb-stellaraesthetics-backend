const mongoose = require("mongoose");

// const Phone_Schema = new mongoose.Schema({
//   number: String,
//   type: String,
// });
// const Email_Schema = new mongoose.Schema({
//   email: String,
//   type: String,
// });

const ClientDetails_Schema = new mongoose.Schema({
  company: String,
  title: String,
  contactPerson: String,
  mobile: String,
  whatsapp: String,
  email: String,
});

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
    clientDetails: ClientDetails_Schema,
    value: Value_Schema,
    stages: [Stage_Schema],
    label: String,
    expectedClosingDate: Date,
  },
  { timestamps: true }
);

const Card_Model = mongoose.model("Card", Card_Schema);
module.exports = Card_Model;
