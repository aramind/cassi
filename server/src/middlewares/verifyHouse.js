const House = require("../models/House");
const sendResponse = require("../utils/senResponse");

const verifyHouse = async (req, res, next) => {
  const houseId = req?.credentials?._id;
  const house = await House.findById(houseId);

  if (!house) {
    return sendResponse.failed(res, "Unauthorized", null, 401);
  }

  next();
};

module.exports = verifyHouse;
