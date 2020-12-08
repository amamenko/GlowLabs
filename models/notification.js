const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const currentDate = new Date().toISOString();

const NotificationSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  new: Boolean,
  type: String,
  date: String,
  time: String,
  associatedClientFirstName: String,
  associatedClientLastName: String,
  originalAssociatedStaffFirstName: String,
  originalAssociatedStaffLastName: String,
  newAssociatedStaffFirstName: String,
  newAssociatedStaffLastName: String,
  createdByFirstName: String,
  createdByLastName: String,
  createdAt: { type: Date, default: currentDate },
});

module.exports = mongoose.model("Notification", NotificationSchema);
