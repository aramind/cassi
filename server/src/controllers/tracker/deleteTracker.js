const Tracker = require("../../models/Tracker");
const sendResponse = require("../../utils/senResponse");

const deleteTracker = async (req, res) => {
  try {
    const { trackerId } = req.params;

    const deletedTracker = await Tracker.findByIdAndDelete(trackerId);

    if (!deletedTracker) {
      return sendResponse.failed(res, "Tracker not found!", null, 404);
    }

    return sendResponse.success(
      res,
      "Tracker removed successfully!",
      deleteTracker,
      200
    );
  } catch (error) {
    console.error(error);
    return sendResponse.failed(
      res,
      "Server Error: Removing Tracker",
      error,
      500
    );
  }
};

module.exports = deleteTracker;
