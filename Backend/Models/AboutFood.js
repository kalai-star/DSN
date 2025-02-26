// models/AboutFood.js
const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  unit: { type: String, required: true },
});

const AboutFoodSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  items: [ItemSchema],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AboutFood", AboutFoodSchema);
