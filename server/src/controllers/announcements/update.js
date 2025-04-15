const { model } = require("mongoose");
const Announcement = require("../../models/Announcement");
const sendResponse = require("../../utils/senResponse");
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;

    const updated = await Announcement.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true, timestamps: true }
    );

    if (!updated) {
      return sendResponse.failed(res, "Announcement not found!", null, 404);
    }

    return sendResponse.success(res, "Update successful", updated, 200);
  } catch (error) {
    console.log(error);
    return sendResponse.failed(
      res,
      "Server Error: Updating announcement.",
      error,
      500
    );
  }
};

model.exports = update;
