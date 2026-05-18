const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  destination: {
    name: { type: String, required: true },
    placeId: { type: String },
    lat: { type: Number },
    lng: { type: Number },
  },
  startDate: {
    type: Date,
  },
  noOfDays: {
    type: Number,
    min: [1, 'Trip must be at least 1 day'],
  },
  budget: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  visibility: {
    type: String,
    enum: ["Private", "Public"],
    default: "Private",
    required: true,
  },
  members: [{ type: String }], // Firebase UIDs
}, { timestamps: true });

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;