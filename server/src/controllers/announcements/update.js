const Announcement = require("../../models/Announcement");
const sendResponse = require("../../utils/senResponse");
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;

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
      date: new Date(),
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
    if (error.code === 11000) {
      return sendResponse.failed(
        res,
        "Announcement title already exist!",
        error,
        409
      );
    }
    return sendResponse.failed(
      res,
      "Server Error: Updating announcement.",
      error,
      500
    );
  }
};

module.exports = update;
