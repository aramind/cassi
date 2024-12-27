const sendResponse = require("../../utils/senResponse");
const Occupant = require("../../models/Occupant");
const HouseOccupant = require("../../models/HouseOccupant");

const addHouseOccupant = async (req, res) => {
  try {
    const { occupant } = req.body;
    const houseId = req?.credentials?._id;

    const house = await House.findById(houseId);

    if (!house) {
      return sendResponse.failed(res, "Unauthorized", null, 401);
    }

    const existingOccupant = Occupant.findOne({
      "name.firstName": occupant.firstName,
      "name.lastName": occupant.lastName,
    });

    const houseOccupant = {};

    if (existingOccupant) {
      houseOccupant = await HouseOccupant.create({
        houseId,
        occupantId: existingOccupant?._id,
      });
    } else {
      const newOccupant = await Occupant.create(occupant);

      houseOccupant = await HouseOccupant.create({
        houseId,
        occupantId: newOccupant?._id,
      });
    }

    return sendResponse.success(
      res,
      "New House Occupant created!",
      houseOccupant,
      201
    );
  } catch (error) {
    return sendResponse.failed(
      res,
      "Server Error: Adding new house occupant!",
      error,
      500
    );
  }
};

module.exports = addHouseOccupant;
