const Tracker = require("../../models/Tracker");
const sendResponse = require("../../utils/senResponse");

const updateTracker = async (req, res) => {
  try {
    const { trackerId } = req.params;
    const data = req.body;

    const updatedTracker = await Tracker.findOneAndUpdate(
      { _id: trackerId },
      { $set: data },
      { new: true }
    );

    if (!updatedTracker) {
      return sendResponse.failed(res, "Tracker not found!", null, 404);
    }

    return sendResponse.success(
      res,
      "Tracker updated successfully!",
      updatedTracker,
      200
    );
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return sendResponse.failed(
        res,
        "Tracker title already exist!",
        error,
        409
      );
    }
    return sendResponse.failed(
      res,
      "Server Error: Updating tracker",
      error,
      500
    );
  }
};

module.exports = updateTracker;
