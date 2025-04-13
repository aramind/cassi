const Announcement = require("../../models/Announcement");
const sendResponse = require("../../utils/senResponse");

const add = async (req, res) => {
  console.log("IN ANN CONTROLLER");
  console.log("REQ", req.body);
  console.log("CRED", req?.credentials?._id);
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
    console.log(error);
    return sendResponse.failed(
      res,
      "Server Error: Adding new announcement",
      error,
      500
    );
  }
};

module.exports = add;
