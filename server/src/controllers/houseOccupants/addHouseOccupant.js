const sendResponse = require("../../utils/senResponse");
const Occupant = require("../../models/Occupant");
const HouseOccupant = require("../../models/HouseOccupant");
const House = require("../../models/House");

const addHouseOccupant = async (req, res) => {
  try {
    const { occupant } = req.body;
    const houseId = req?.credentials?._id;

    console.log("IN ADD HOUSE OCCUPANT CONTROLLER");
    console.log("OCCUPANT", occupant);
    console.log("credentials", req?.credentials);
    console.log("houseId", houseId);

    const house = await House.findById(houseId);

    if (!house) {
      return sendResponse.failed(res, "Unauthorized", null, 401);
    }

    const existingOccupant = await Occupant.findOne({
      "name.firstName": occupant?.name?.firstName,
      "name.lastName": occupant?.name?.lastName,
    });

    let houseOccupant = {};

    // console.log("EXISTING", existingOccupant);

    if (existingOccupant) {
      const existing = { houseId, occupantId: existingOccupant?._id };
      const existingHouseOccupant = await HouseOccupant.findOne(existing);

      if (existingHouseOccupant) {
        return sendResponse.failed(
          res,
          "Occupant is already a member of the house",
          null,
          409
        );
      }
      houseOccupant = await HouseOccupant.create(existing);
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
    console.log(error);
    return sendResponse.failed(
      res,
      "Server Error: Adding new house occupant!",
      error,
      500
    );
  }
};

module.exports = addHouseOccupant;
