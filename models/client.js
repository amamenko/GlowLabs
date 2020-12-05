const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ConsentForm = require("./consentform");
const MyRoutine = require("./myroutine");

const currentDate = new Date().toISOString();

const ClientSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  squareCustomerId: String,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  password: String,
  profilePicture: String,
  unsavedSquareCardIDs: { type: Array, default: [] },
  tokenCount: { type: Number, default: 0 },
  consentForm: ConsentForm.schema.obj,
  myRoutine: MyRoutine.schema.obj,
  createdAt: { type: Date, default: currentDate },
});

module.exports = mongoose.model("Client", ClientSchema);
