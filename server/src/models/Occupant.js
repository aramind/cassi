import mongoose, { Schema } from "mongoose";
import CONSTANTS from "../configs/constants";

const OccupantSchema = new Schema({
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  version: {
    type: String,
    default: CONSTANTS?.DEFAULT_VALUES?.version,
    enum: { values: CONSTANTS?.VERSIONS },
  },
});

module.exports = mongoose.model("Occupant", OccupantSchema);
