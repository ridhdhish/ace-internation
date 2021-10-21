const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  grossPrice: {
    type: Number,
    required: true,
  },
  vat: {
    type: Number,
    required: true,
  },
  netPrice: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
