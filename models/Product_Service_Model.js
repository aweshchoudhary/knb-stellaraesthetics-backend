const mongoose = require("mongoose");

const Image_Schema = new mongoose.Schema({
  name: String,
  size: Number,
  path: String,
});

const Product_Service_Schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: Image_Schema,
  type: { type: String, required: true },
  rate: { type: Number, required: true },
  qty: { type: Number, required: true },
  qty_type: { type: String, required: true },
  currency: { type: String, required: true },
  creator: { type: String, required: true },
});

Product_Service_Schema.index({});

const Product_Service_Model = mongoose.model(
  "ProductService",
  Product_Service_Schema
);

module.exports = Product_Service_Model;
