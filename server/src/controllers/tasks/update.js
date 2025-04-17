const Task = require("../../models/Task");
const sendResponse = require("../../utils/senResponse");
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { updates } = req.body;

    // updating
    const updated = await Task.findOneAndUpdate(
      { _id: id },
      { $set: updates },
      { new: true, timestamps: true }
    );

    if (!updated) {
      return sendResponse.failed(res, "Task not found.", null, 404);
    }

    return sendResponse.success(res, "Update successful", updated, 200);
  } catch (error) {
    console.log(error);
    return sendResponse.failed(res, "Server Error: Updating task.", error, 500);
  }
};

module.exports = update;
