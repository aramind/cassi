const House = require("../../models/House");
const _ = require("lodash");
const generateAccessToken = require("../../utils/generateAccessToken");
const generateRefreshToken = require("../../utils/generateRefreshToken");
const sendResponse = require("../../utils/senResponse");
const HouseOccupant = require("../../models/HouseOccupant");

const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    const house = await House.findOne({ name });

    if (!house || house?.password !== password) {
      return sendResponse.failed(res, "Invalid credentials", null, 404);
    }

    const message =
      house?.membershipStatus === "pending"
        ? "We're still processing your registration. Please wait for approval"
        : `Your account is ${house?.membershipStatus}!. Please contact admin. `;

    if (house?.membershipStatus !== "active") {
      return sendResponse.failed(res, message, null, 403);
    }

    // TODO
    // create and attach jwts
    const accessToken = generateAccessToken(house);
    const refreshToken = generateRefreshToken(house);

    house.refreshToken = refreshToken;

    const updatedHouse = await house.save();

    const houseOccupants = await HouseOccupant.find({
      house: house?._id,
    })
      .populate({ path: "occupant", select: "-version -house -_id" })
      .select("-version");

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const returnedHouseInfo = _.pick(house, [
      "_id",
      "name",
      "address",
      "houseType",
      "picture",
      "membershipType",
      "membershipStatus",
    ]);

    return sendResponse.success(
      res,
      `Login successful`,
      {
        houseInfo: { ...returnedHouseInfo, houseOccupants: houseOccupants },
        token: accessToken,
      },
      200
    );
  } catch (error) {
    console.error(error);
    sendResponse.failed(res, "Server Error", error, 500);
  }
};

module.exports = login;
