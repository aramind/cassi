const Task = require("../../models/Task");
const sendResponse = require("../../utils/senResponse");

const getTasks = async (req, res) => {
  try {
    const { fields, ...queryParams } = req.query;
    const houseId = req?.credentials?._id;

    const requestedFields = fields ? fields.split(",").join(" ").trim() : null;
    const filter = {
      ...queryParams,
      house: houseId,
    };

    const tasks = await Task.find(filter, requestedFields);

    if (!tasks) {
      return sendResponse.failed(res, "Task(s) not found.", null, 404);
    }

    return sendResponse.success(
      res,
      "Task(s) successfully retrieved",
      tasks,
      200
    );
  } catch (error) {
    console.log(error);
    return sendResponse.failed(
      res,
      "Server Error: Retrieving task(s)",
      error,
      500
    );
  }
};

module.exports = getTasks;
