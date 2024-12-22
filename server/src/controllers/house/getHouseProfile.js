const House = require("../../models/House");
const sendResponse = require("../../utils/senResponse");

const getHouseProfile = async (req, res) => {
  try {
    const { houseId } = req.params;

    const house = await House.findById(houseId);

    if (!house) {
      return sendResponse.failed(res, "House not registered", null, 404);
    }

    return sendResponse.success(
      res,
      "House profile retrieved successfully",
      house,
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
