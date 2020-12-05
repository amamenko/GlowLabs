const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addOnSchema = new Schema({
  name: String,
  duration: Number,
  price: Number
});

module.exports = mongoose.model("AddOn", addOnSchema);
