const mongoose = require("mongoose");

const ClientDetails_Schema = new mongoose.Schema({
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
});

ClientDetails_Schema.index({
  company: "text",
  contactPerson: "text",
  mobile: "text",
  whatsapp: "text",
  email: "text",
});

const ClientDetails_Model = mongoose.model("Client", ClientDetails_Schema);

module.exports = ClientDetails_Model;
