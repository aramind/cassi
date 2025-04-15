const Announcement = require("../../models/Announcement");
const sendResponse = require("../../utils/senResponse");

const softDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const softDeleted = await Announcement.findByIdAndUpdate(
      id,
      { status: "deleted" },
      { new: true, timestamps: true }
    );

    if (!softDeleted) {
      return sendResponse.failed(res, "Announcement not found!", null, 404);
    }

    return sendResponse.success(
      res,
      "Announcement successfully deleted!",
      softDeleted,
      200
    );
  } catch (error) {
    console.log(error);
    return sendResponse.failed(
      res,
      "Server Error: Deleting announcement.",
      error,
      500
    );
  }
};

module.exports = softDelete;
