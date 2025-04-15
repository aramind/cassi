const Announcement = require("../../models/Announcement");

const restoreDeleted = async (req, res) => {
  try {
    const { id } = req.params;

    const restored = await Announcement.findByIdAndUpdate(
      id,
      { status: "published" },
      { new: true, timestamps: true }
    );

    if (!restored) {
      return sendResponse.failed(res, "Announcement not found!", null, 404);
    }

    return sendResponse.success(
      res,
      "Announcement successfully restored!",
      restored,
      200
    );
  } catch (error) {
    console.log(error);
    return sendResponse.failed(
      res,
      "Server Error: Restoring deleted announcement.",
      error,
      500
    );
  }
};

module.exports = restoreDeleted;
