const Announcement = require("../../models/Announcement");
const sendResponse = require("../../utils/senResponse");

const getAnnouncements = async (req, res) => {
  try {
    const { fields, ...queryParams } = req.query;
    const houseId = req?.credentials?._id;

    const requestedFields = fields ? fields.split(",").join(" ").trim() : null;

    const filter = {
      ...queryParams,
      house: houseId,
    };
    const announcements = await Announcement.find(
      filter,
      requestedFields || undefined
    );

    if (!announcements) {
      return sendResponse.failed(res, "Announcement(s) not found!", null, 404);
    }

    return sendResponse.success(
      res,
      "Announcement(s) successfully retrieved",
      announcements,
      200
    );
  } catch (error) {
    console.log(error);
    return sendResponse.failed(
      res,
      "Server Error: Retrieving announcement(s)",
      error,
      500
    );
  }
};

module.exports = getAnnouncements;
