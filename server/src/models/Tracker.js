const mongoose = require("mongoose");
const House = require("./House");
const HouseOccupant = require("./HouseOccupant");
const CONSTANTS = require("../configs/constants");
const Schema = mongoose.Schema;

const TrackerSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  house: { type: Schema.Types.ObjectId, ref: House, required: true },
  entries: [
    {
      entryId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      date: { type: Date, required: true, default: Date.now },
      originalAssignee: {
        type: Schema.Types.ObjectId,
        ref: HouseOccupant,
      },

      completedBy: {
        type: Schema.Types.ObjectId,
        ref: HouseOccupant,
      },

      comments: [{ type: String }],
    },
  ],
  status: {
    type: String,
    enum: ["active", "onhold", "deleted"],
    default: "active",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  version: {
    type: String,
    default: CONSTANTS?.DEFAULT_VALUES?.version,
    enum: { values: CONSTANTS?.VERSIONS },
  },
});

module.exports = mongoose.model("Tracker", TrackerSchema);
