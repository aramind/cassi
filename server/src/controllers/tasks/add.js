const Task = require("../../models/Task");
const sendResponse = require("../../utils/senResponse");

const add = async (req, res) => {
  try {
    const { task } = req.body;
    const houseId = req?.credentials?._id;

    if (!task) {
      sendResponse.failed(res, "No task details", null, 400);
    }

    const newTask = await Task.create({ ...task, house: houseId });

    return sendResponse.success(res, "New task created.", newTask, 201);
  } catch (error) {
    console.log(error);
    return sendResponse.failed(
      res,
      "Server Error: Adding new task",
      error,
      500
    );
  }
};

module.exports = add;
