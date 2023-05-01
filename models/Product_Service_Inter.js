const mongoose = require("mongoose");

const Product_Service_Inter_Schema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  currency: { type: String, required: true },
  rate: { type: Number, required: true },
  tax: { type: Number, required: true },
  creator: { type: String, required: true },
  quantity: { type: Number, required: true },
  quantity_type: { type: String, required: true },
});

Product_Service_Inter_Schema.index({});

const Product_Service_Inter_Model = mongoose.model(
  "ProductServiceInter",
  Product_Service_Inter_Schema
);

module.exports = Product_Service_Inter_Model;
