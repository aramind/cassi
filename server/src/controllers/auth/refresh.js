const House = require("../../models/House");
const sendResponse = require("../../utils/senResponse");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const generateAccessToken = require("../../utils/generateAccessToken");

const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies?.jwt;

    if (!refreshToken) {
      return sendResponse.failed(res, "Unauthorized", null, 401);
    }

    const house = await House.findOne({
      refreshToken,
    });

    if (!house) {
      return sendResponse.failed(res, "Unrecognized credentials", null, 404);
    }

    const houseOccupants = await HouseOccupant.find({
      house: house?._id,
    })
      .populate({ path: "occupant", select: "-version -house -_id" })
      .select("-version");

    const returnedHouseInfo = _.pick(house, [
      "_id",
      "name",
      "address",
      "houseType",
      "picture",
      "membershipType",
      "membershipStatus",
    ]);

    jwt.verify(
      refreshToken,
      process.env.AUTH_REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          throw err;
        } else {
          if (house?._id?.toString() !== decoded.HouseInfo._id) {
            return sendResponse.failed(res, "Unauthorized", null, 400);
          }
          return sendResponse.success(
            res,
            "Refreshing successful",
            {
              ...returnedHouseInfo,
              houseInfo: {
                ...returnedHouseInfo,
                houseOccupants: houseOccupants,
              },
              token: generateAccessToken(house),
            },
            200
          );
        }
      }
    );
  } catch (error) {
    return sendResponse.failed(res, "Error in refreshing credentials", 500);
  }
};

module.exports = refresh;
