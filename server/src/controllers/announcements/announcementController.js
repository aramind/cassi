const add = require("./add");
const getAnnouncements = require("./getAnnouncements");
const getById = require("./getById");
const softDelete = require("./softDelete");
const update = require("./update");

const announcementController = {
  add,
  getById,
  getAnnouncements,
  update,
  softDelete,
};

module.exports = announcementController;
