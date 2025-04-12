const Announcement = require("../../models/Announcement");
const sendResponse = require("../../utils/senResponse");

const add = async (req, res) => {
  try {
    const { announcement } = req.body || {};
    const houseId = req?.credentials?._id;

    const newAnnouncement = await Announcement.create({
      ...announcement,
      house: houseId,
    });

    return sendResponse.success(
      res,
      "New Announcement created",
      newAnnouncement,
      201
    );
  } catch (error) {
    return sendResponse.failed(
      res,
      "Server Error: Adding new announcement",
      error,
      500
    );
  }
};

module.exports = add;
