const add = require("./add");
const getAnnouncements = require("./getAnnouncements");
const getById = require("./getById");
const hardDelete = require("./hardDelete");
const restoreDeleted = require("./restoreDeleted");
const softDelete = require("./softDelete");
const update = require("./update");

const announcementController = {
  add,
  getById,
  getAnnouncements,
  update,
  softDelete,
  hardDelete,
  restoreDeleted,
};

module.exports = announcementController;
