const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const currentDate = new Date().toISOString();

const EmployeeSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  profilePicture: String,
  employeeRole: { type: Array, default: [] },
  permanentPasswordSet: { type: Boolean, default: false },
  password: String,
  tokenCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: currentDate },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
