const HouseOccupant = require("../../models/HouseOccupant");
const sendResponse = require("../../utils/senResponse");

const getHouseOccupant = async (req, res) => {
  try {
    const { _id } = req.params;

    const houseOccupant = await HouseOccupant.findById(_id)
      .select("status moveInDate type occupant")
      .populate({
        path: "occupant",
        select: "-__v -version -updatedAt -createdAt",
      });

    if (!houseOccupant) {
      return sendResponse.failed(res, "Occupant not registered", null, 404);
    }

    return sendResponse.success(
      res,
      "House occupant successfully retrieved",
      houseOccupant,
      200
    );
  } catch (error) {
    return (
      sendResponse.failed(res, "Server Error: Retrieving house occupant"),
      error,
      500
    );
  }
};

module.exports = getHouseOccupant;
