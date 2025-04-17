const add = require("./add");
const getTasks = require("./getTasks");
const update = require("./update");

const taskController = {
  add,
  getTasks,
  update,
};

module.exports = taskController;
