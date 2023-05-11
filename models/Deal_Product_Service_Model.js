const mongoose = require("mongoose");

const Deal_Product_Service = new mongoose.Schema({
  productServiceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "ProductService",
  },
  dealId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Deal" },
  rate: { type: Number, required: true },
  qty: { type: Number, required: true },
  qty_type: { type: String, required: true },
  discount: { type: Number },
  tax: { type: Number },
  total: { type: Number, required: true },
  currency: { type: String, required: true },
});

const Product_Service_Inter_Model = mongoose.model(
  "DealProductService",
  Deal_Product_Service
);

module.exports = Product_Service_Inter_Model;
