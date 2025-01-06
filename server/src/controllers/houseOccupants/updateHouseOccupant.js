const HouseOccupant = require("../../models/HouseOccupant");
const Occupant = require("../../models/Occupant");
const sendResponse = require("../../utils/senResponse");

const updateHouseOccupant = async (req, res) => {
  console.log("In update house occupant controller");
  try {
    const { houseOccupantId } = req.params;
    const { occupant, ...otherHouseOccupantInfo } = req.body;

    let updatedOccupant = {};

    if (occupant) {
      const { _id, ...otherOccupantInfos } = occupant;
      updatedOccupant = await Occupant.findOneAndUpdate(
        { _id: occupant?._id },
        { $set: { ...otherOccupantInfos } },
        { new: true }
      );
    }

    const houseOccupantInfoUpdate = {
      ...otherHouseOccupantInfo,
      occupant: updatedOccupant,
    };

    console.log(houseOccupantInfoUpdate);
    const updatedHouseOccupant = await HouseOccupant.findOneAndUpdate(
      { _id: houseOccupantId },
      { $set: { ...houseOccupantInfoUpdate } },
      { new: true }
    );

    return sendResponse.success(res, "success", updatedHouseOccupant, 200);
  } catch (error) {
    console.log(error);
    return sendResponse.failed(
      res,
      "Server Error: Updating houseoccupant",
      error,
      500
    );
  }
};

module.exports = updateHouseOccupant;
