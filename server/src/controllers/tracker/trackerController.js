const addTracker = require("./addTracker");
const getTrackers = require("./getTrackers");
const updateTracker = require("./updateTracker");

const trackerController = {
  addTracker,
  getTrackers,
  updateTracker,
};

module.exports = trackerController;
