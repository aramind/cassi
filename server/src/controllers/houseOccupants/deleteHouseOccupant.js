const HouseOccupant = require("../../models/HouseOccupant");
const sendResponse = require("../../utils/senResponse");

const deleteHouseOccupant = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await HouseOccupant.findByIdAndDelete(id);

    if (!deleted) {
      return sendResponse.failed(res, "House occupant not found!", null, 404);
    }
    return sendResponse.success(
      res,
      "House Occupant removed successfully from database.",
      deleted,
      200
    );
  } catch (error) {
    console.error(error);
    return sendResponse.failed(
      res,
      "Server Error: Removing House Occupant.",
      error,
      500
    );
  }
};

module.exports = deleteHouseOccupant;
