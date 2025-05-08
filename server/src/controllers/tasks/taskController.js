const add = require("./add");
const getTasks = require("./getTasks");
const softDelete = require("./softDelete");
const update = require("./update");

const taskController = {
  add,
  getTasks,
  update,
  softDelete,
};

module.exports = taskController;
