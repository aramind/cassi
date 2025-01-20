const mongoose = require("mongoose");
const House = require("./House");
const Occupant = require("./Occupant");
const HouseOccupant = require("./HouseOccupant");
const Schema = mongoose.Schema;

const TrackerSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  house: { type: Schema.Types.ObjectId, ref: House, required: true },
  entries: [
    {
      date: { type: Date, required: true, default: Date.now },
      originalAssignee: {
        houseOccupant: { type: Schema.Types.ObjectId, ref: HouseOccupant },
      },
      completedBy: {
        houseOccupant: { type: Schema.Types.ObjectId, ref: HouseOccupant },
      },
      comments: [{ type: String }],
      status: {
        type: String,
        enum: ["active", "onhold", "deleted"],
        default: "active",
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Tracker", TrackerSchema);
