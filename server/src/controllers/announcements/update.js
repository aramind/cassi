const { model } = require("mongoose");
const Announcement = require("../../models/Announcement");
const sendResponse = require("../../utils/senResponse");
const update = async (req, res) => {
  console.log("IN UPDATE CONTROLLER");
  try {
    const { id } = req.params;
    const { data } = req.body;

    console.log("DATA", data);

    const existing = await Announcement.findById(id);
    if (!existing) {
      return sendResponse.failed(res, "Announcement not found!", null, 404);
    }

    // adding current data to revision before updating
    const revisionEntry = {
      oldVersion: {
        title: data?.title,
        content: data?.content,
        type: data?.type,
        importance: data?.importance,
      },
      date: data?.createdAt,
    };

    const updatedRevisions = [...existing.revisions, revisionEntry];

    const updated = await Announcement.findOneAndUpdate(
      { _id: id },
      { $set: { ...data, revisions: updatedRevisions } },
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

module.exports = update;
