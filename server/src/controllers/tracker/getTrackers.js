const Tracker = require("../../models/Tracker");
const sendResponse = require("../../utils/senResponse");

const getTrackers = async (req, res) => {
  try {
    const { fields, ...queryParams } = req.query;
    const houseId = req?.credentials?._id;

    const requestedFields = fields ? fields.split(",").join(" ").trim() : null;

    const filter = {
      ...queryParams,
      house: houseId,
    };

    const trackers = await Tracker.find(filter, requestedFields || undefined);

    if (!trackers) {
      return sendResponse.failed(res, "Tracker(s) not found", null, 404);
    }
    return sendResponse.success(
      res,
      "Tracker(s) successfully retrieved",
      trackers,
      200
    );
  } catch (error) {
    console.log(error);
    return sendResponse.failed(
      res,
      "Server Error: Retrieving tracker(s)",
      error,
      500
    );
  }
};

module.exports = getTrackers;
