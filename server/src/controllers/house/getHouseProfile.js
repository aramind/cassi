const House = require("../../models/House");
const HouseOccupant = require("../../models/HouseOccupant");
const sendResponse = require("../../utils/senResponse");

const getHouseProfile = async (req, res) => {
  try {
    const { houseId } = req.params;

    const house = await House.findById(houseId).select(
      "name houseType membershipType membershipStatus"
    );

    if (!house) {
      return sendResponse.failed(res, "House not registered", null, 404);
    }

    const occupants = await HouseOccupant.find({ house: houseId })
      .select("-version -updatedAt -createdAt -__v -house -_id")
      .populate({
        path: "occupant",
        select: "-__v -version -updatedAt -createdAt",
      });

    return sendResponse.success(
      res,
      "House profile retrieved successfully",
      { ...house.toObject(), occupants },
      200
    );
  } catch (error) {
    console.log(error);
    return sendResponse.failed(
      res,
      "Internal Server Error: Retrieving house profile",
      error,
      500
    );
  }
};

module.exports = getHouseProfile;
