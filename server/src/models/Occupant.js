const mongoose = require("mongoose");
const CONSTANTS = require("../configs/constants");
const Schema = mongoose.Schema;

const OccupantSchema = new Schema(
  {
    name: {
      firstName: { type: String, required: true },
      middleName: { type: String },
      lastName: { type: String, required: true },
      nickName: { type: String },
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    contactNumbers: {
      type: [String],
    },
    gender: {
      type: String,
      enum: { values: CONSTANTS?.GENDER_OPTIONS },
      default: CONSTANTS?.DEFAULT_VALUES?.gender,
    },
    occupation: {
      type: String,
    },
    emergencyContact: {
      name: { type: String },
      address: { type: String },
      relationToOccupant: { type: String },
      email: { type: String, trim: true },
      mobileNumber: { type: String },
      phoneNumber: { type: String },
    },
    dateOfBirth: {
      type: Date,
    },
    preferences: {
      type: [String],
    },
    version: {
      type: String,
      default: CONSTANTS?.DEFAULT_VALUES?.version,
      enum: { values: CONSTANTS?.VERSIONS },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Occupant", OccupantSchema);
