const mongoose = require("mongoose");
const CONSTANTS = require("../configs/constants");
const Schema = mongoose.Schema;
const House = require("./House");
const Occupant = require("./Occupant");

const HouseOccupantSchema = new Schema(
  {
    house: {
      type: Schema.Types.ObjectId,
      ref: House,
      required: true,
    },
    occupant: {
      type: Schema.Types.ObjectId,
      ref: Occupant,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: CONSTANTS?.DEFAULT_VALUES?.houseOccupantStatus,
      enum: CONSTANTS?.HOUSE_OCCUPANT_STATUSES,
    },
    moveInDate: {
      type: Date,
      require: true,
      default: Date.now,
    },
    moveOutDate: {
      type: Date,
    },
    type: {
      type: String,
    },
    version: {
      type: String,
      required: true,
      default: CONSTANTS?.DEFAULT_VALUES?.version,
      enum: CONSTANTS?.VERSIONS,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HouseOccupant", HouseOccupantSchema);
