const mongoose = require("mongoose");

const Image_Schema = new mongoose.Schema({
  name: String,
  size: Number,
  path: String,
});

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: Image_Schema,
  type: { type: String, required: true },
  rate: { type: Number, required: true },
  qty: { type: Number, required: true },
  qty_type: { type: String, required: true },
  currency: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

ItemSchema.index({});

const ItemModel = mongoose.model("Item", ItemSchema);

module.exports = ItemModel;
