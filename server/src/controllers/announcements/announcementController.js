const add = require("./add");
const getAnnouncements = require("./getAnnouncements");
const getById = require("./getById");
const announcementController = {
  add,
  getById,
  getAnnouncements,
};

module.exports = announcementController;
