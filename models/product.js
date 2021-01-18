const mongoose = require("mongoose");

//set schema for the product
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Array},
  colors: { type: String },
  design: { type: String },
  fabric: { type: String },
  discount: { type: Number, default: 0.0 },
  images: { type: Array, required: true },
});

module.exports = mongoose.model("Product", productSchema);
