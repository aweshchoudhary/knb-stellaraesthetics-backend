const mongoose = require("mongoose");

const Product_Service_Schema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  currency: { type: String, required: true },
  rate: { type: Number, required: true },
  tax: { type: Number, required: true },
  creator: { type: String, required: true },
  quantity: { type: Number, required: true },
  quantity_type: { type: String, required: true },
});

Product_Service_Schema.index({});

const Product_Service_Model = mongoose.model(
  "Product_Service",
  Product_Service_Schema
);

module.exports = Product_Service_Model;
