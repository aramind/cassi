const Announcement = require("../../models/Announcement");
const sendResponse = require("../../utils/senResponse");
const getById = async (req, res) => {
  try {
    const { announcementId } = req.params;
    const { fields } = req.query;
    const requestedFields = fields ? fields.split(",").join(" ").trim() : null;

    const announcement = await Announcement.findById(announcementId).select(
      requestedFields
    );

    if (!announcement) {
      return sendResponse.failed(res, "Announcement not found!", null, 404);
    }

    return sendResponse.success(
      res,
      "Announcement successfully retrieved",
      announcement,
      200
    );
  } catch (error) {
    console.log(error);
    return sendResponse.failed(
      res,
      "Server Error: Retrieving an announcement",
      error,
      500
    );
  }
};

module.exports = getById;
