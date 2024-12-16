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
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: { values: CONSTANTS?.GENDER_OPTIONS },
    default: CONSTANTS?.DEFAULT_VALUES?.gender,
  },
  occupation: {
    type: String,
  },
  emergencyContact: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    relationToOccupant: { type: String, required: true },
    email: { type: String, trim: true },
    mobileNumber: { type: String, required: true },
    phoneNumber: { type: String, required: true },
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
});

module.exports = mongoose.model("Occupant", OccupantSchema);
