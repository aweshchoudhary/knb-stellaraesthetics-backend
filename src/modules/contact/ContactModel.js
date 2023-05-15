const mongoose = require("mongoose");

const Contact_Schema = new mongoose.Schema(
  {
    company: String,
    contactPerson: String,
    mobile: String,
    whatsapp: String,
    email: String,
    address: {
      line1: String,
      line2: String,
      country: Object,
      city: Object,
      state: Object,
      postalCode: Number,
    },
  },
  { timestamps: true }
);

Contact_Schema.index({
  company: "text",
  contactPerson: "text",
  mobile: "text",
  whatsapp: "text",
  email: "text",
});

const Contact_Model = mongoose.model("Contact", Contact_Schema);

module.exports = Contact_Model;
