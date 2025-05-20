const addHouseOccupant = require("./addHouseOccupant");
const updateHouseOccupant = require("./updateHouseOccupant");
const getHouseOccupant = require("./getHouseOccupant");
const deleteHouseOccupant = require("./deleteHouseOccupant");

const houseOccupantController = {
  addHouseOccupant,
  updateHouseOccupant,
  getHouseOccupant,
  deleteHouseOccupant,
};

module.exports = houseOccupantController;
