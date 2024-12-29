const mongoose = require("mongoose");
const CONSTANTS = require("../configs/constants");
const Schema = mongoose.Schema;
const House = require("./House");
const Occupant = require("./Occupant");

const HouseOccupantSchema = new Schema({
  houseId: {
    type: Schema.Types.ObjectId,
    ref: House,
    required: true,
  },
  occupantId: {
    type: Schema.Types.ObjectId,
    ref: Occupant,
    required: true,
  },
  moveInDate: {
    type: Date,
    require: true,
    default: Date.now(),
  },

  moveOutDate: {
    type: Date,
  },

  type: {
    type: String,
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
    required: true,
    default: CONSTANTS?.DEFAULT_VALUES?.version,
    enum: { values: CONSTANTS?.VERSIONS },
  },
});

module.exports = mongoose.model("HouseOccupant", HouseOccupantSchema);
