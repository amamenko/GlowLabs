const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const treatmentSchema = new Schema({
  name: String,
  duration: Number,
  price: Number
});

module.exports = mongoose.model("Treatment", treatmentSchema);
