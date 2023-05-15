const mongoose = require("mongoose");

const DealItemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Item",
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

const DealItemModel = mongoose.model("DealItem", DealItemSchema);

module.exports = DealItemModel;
