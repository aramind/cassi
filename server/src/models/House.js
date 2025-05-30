const mongoose = require("mongoose");
const CONSTANTS = require("../configs/constants");
const Schema = mongoose.Schema;

const HouseSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
      unique: true,
    },
    address: {
      type: String,
      trim: true,
    },
    houseType: {
      type: String,
      enum: { values: CONSTANTS?.HOUSE_TYPES },
      default: CONSTANTS?.DEFAULT_VALUES?.houseType,
    },
    picture: { type: String },
    membershipType: {
      type: String,
      required: true,
      enum: { values: CONSTANTS?.MEMBERSHIP_TYPES },
      default: CONSTANTS?.DEFAULT_VALUES?.membershipType,
    },
    membershipStatus: {
      type: String,
      required: true,
      enum: { values: CONSTANTS?.MEMBERSHIP_STATUSES },
      default: CONSTANTS?.DEFAULT_VALUES?.membershipStatus,
    },
    version: {
      type: String,
      required: true,
      default: CONSTANTS?.DEFAULT_VALUES?.version,
      enum: { values: CONSTANTS?.VERSIONS },
    },
    tokens: [{ name: { type: String }, value: { type: String } }],
    refreshToken: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("House", HouseSchema);
