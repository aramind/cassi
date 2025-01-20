const Tracker = require("../../models/Tracker");
const sendResponse = require("../../utils/senResponse");

const addTracker = async (req, res) => {
  //   console.log("IN ADD TRACKER CONTROLLER");
  try {
    const { tracker } = req.body;
    const houseId = req?.credentials?._id;

    const existingTracker = await Tracker.findOne({
      title: tracker?.title,
    });

    if (existingTracker) {
      return sendResponse.failed(res, "Tracker already exists!", null, 409);
    }

    const newTracker = await Tracker.create({
      ...tracker,
      house: houseId,
    });

    return sendResponse.success(res, "New tracker added", newTracker, 201);
  } catch (error) {
    console.log(error);
    return sendResponse.failed(
      res,
      "Server Error: Adding new tracker",
      error,
      500
    );
  }
};

module.exports = addTracker;
