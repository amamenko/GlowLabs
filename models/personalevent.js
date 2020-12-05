const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const currentDate = new Date().toISOString();

const PersonalEventSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  notes: String,
  staff: String,
  date: String,
  startTime: String,
  endTime: String,
  duration: Number,
  allDay: Boolean,
  blockTime: Boolean,
  createdAt: { type: Date, default: currentDate },
});

module.exports = mongoose.model("PersonalEvent", PersonalEventSchema);
