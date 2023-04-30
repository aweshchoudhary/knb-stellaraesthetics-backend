const mongoose = require("mongoose");

const Company_Schema = new mongoose.Schema({
  name: String,
  description: String,
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
});

Company_Schema.index({
  company: "text",
  contactPerson: "text",
  mobile: "text",
  whatsapp: "text",
  email: "text",
});

const Company_Model = mongoose.model("Company", Company_Schema);

module.exports = Company_Model;
