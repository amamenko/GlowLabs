const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  new: Boolean,
  type: String,
  date: String,
  time: String,
  allDay: Boolean,
  associatedClientFirstName: String,
  associatedClientLastName: String,
  originalAssociatedStaffFirstName: String,
  originalAssociatedStaffLastName: String,
  newAssociatedStaffFirstName: String,
  newAssociatedStaffLastName: String,
  createdByFirstName: String,
  createdByLastName: String,
  createdAt: { type: Date },
});

module.exports = mongoose.model("Notification", NotificationSchema);
