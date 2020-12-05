const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MyRoutineSchema = new Schema({
  morningCleanser: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
      },
      name: { type: String },
      frequency: { type: String },
      useNotes: { type: String },
      link: { type: String },
    },
  ],
  morningToner: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
      },
      name: { type: String },
      frequency: { type: String },
      useNotes: { type: String },
      link: { type: String },
    },
  ],
  morningSerum: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
      },
      name: { type: String },
      frequency: { type: String },
      useNotes: { type: String },
      link: { type: String },
    },
  ],
  morningMoisturizer: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
      },
      name: { type: String },
      frequency: { type: String },
      useNotes: { type: String },
      link: { type: String },
    },
  ],
  morningSPF: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
      },
      name: { type: String },
      frequency: { type: String },
      useNotes: { type: String },
      link: { type: String },
    },
  ],
  morningRX: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
      },
      name: { type: String },
      frequency: { type: String },
      useNotes: { type: String },
      link: { type: String },
    },
  ],
  morningEyeCream: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
      },
      name: { type: String },
      frequency: { type: String },
      useNotes: { type: String },
      link: { type: String },
    },
  ],
  eveningOilCleanser: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
      },
      name: { type: String },
      frequency: { type: String },
      useNotes: { type: String },
      link: { type: String },
    },
  ],
  eveningCleanser: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
      },
      name: { type: String },
      frequency: { type: String },
      useNotes: { type: String },
      link: { type: String },
    },
  ],
  eveningExfoliator: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
      },
      name: { type: String },
      frequency: { type: String },
      useNotes: { type: String },
      link: { type: String },
    },
  ],
  eveningTreatmentMask: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
      },
      name: { type: String },
      frequency: { type: String },
      useNotes: { type: String },
      link: { type: String },
    },
  ],
  eveningToner: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
      },
      name: { type: String },
      frequency: { type: String },
      useNotes: { type: String },
      link: { type: String },
    },
  ],
  eveningSerum: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
      },
      name: { type: String },
      frequency: { type: String },
      useNotes: { type: String },
      link: { type: String },
    },
  ],
  eveningMoisturizer: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
      },
      name: { type: String },
      frequency: { type: String },
      useNotes: { type: String },
      link: { type: String },
    },
  ],
  eveningNightMask: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
      },
      name: { type: String },
      frequency: { type: String },
      useNotes: { type: String },
      link: { type: String },
    },
  ],
  eveningOil: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
      },
      name: { type: String },
      frequency: { type: String },
      useNotes: { type: String },
      link: { type: String },
    },
  ],
  eveningSpotTreatment: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
      },
      name: { type: String },
      frequency: { type: String },
      useNotes: { type: String },
      link: { type: String },
    },
  ],
  eveningRX: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
      },
      name: { type: String },
      frequency: { type: String },
      useNotes: { type: String },
      link: { type: String },
    },
  ],
  eveningEyeCream: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
      },
      name: { type: String },
      frequency: { type: String },
      useNotes: { type: String },
      link: { type: String },
    },
  ],
});

module.exports = mongoose.model("MyRoutine", MyRoutineSchema);
