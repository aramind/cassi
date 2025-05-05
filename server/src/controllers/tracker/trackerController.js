const addTracker = require("./addTracker");
const deleteTracker = require("./deleteTracker");
const getTrackers = require("./getTrackers");
const updateTracker = require("./updateTracker");

const trackerController = {
  addTracker,
  getTrackers,
  updateTracker,
  deleteTracker,
};

module.exports = trackerController;
