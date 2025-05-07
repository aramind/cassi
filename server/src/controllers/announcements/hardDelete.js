const Announcement = require("../../models/Announcement");
const sendResponse = require("../../utils/senResponse");
const hardDelete = async (req, res) => {
  try {
    const { announcementId } = req.params;

    const deletedAnnouncement = await Announcement.findByIdAndDelete(
      announcementId
    );

    if (!deletedAnnouncement) {
      return sendResponse.failed(res, "Announcement not found!", null, 404);
    }

    return sendResponse.success(
      res,
      "Announcement removed successfully from database.",
      deletedAnnouncement,
      200
    );
  } catch (error) {
    console.error(error);
    return sendResponse.failed(
      res,
      "Server Error: Removing announcement.",
      error,
      500
    );
  }
};

module.exports = hardDelete;
