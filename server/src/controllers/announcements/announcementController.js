const add = require("./add");
const getAnnouncements = require("./getAnnouncements");
const getById = require("./getById");
const update = require("./update");

const announcementController = {
  add,
  getById,
  getAnnouncements,
  update,
};

module.exports = announcementController;
