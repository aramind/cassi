const Task = require("../../models/Task");
const sendResponse = require("../../utils/senResponse");

const softDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const softDeleted = await Task.findByIdAndUpdate(
      id,
      { status: "deleted" },
      { new: true, timestamps: true }
    );

    if (!softDeleted) {
      return sendResponse.failed(res, "Task not found!", null, 404);
    }

    return sendResponse.success(
      res,
      "Task successfully deleted!",
      softDeleted,
      200
    );
  } catch (error) {
    console.log(error);
    return sendResponse.failed(res, "Server Error: Deleting task.", error, 500);
  }
};

module.exports = softDelete;
