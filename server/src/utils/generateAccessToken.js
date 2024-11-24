require("dotenv").config();
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const generateAccessToken = (house) => {
  const houseInfo = _.pick(house, [
    "_id",
    "name",
    "membershipType",
    "membershipStatus",
    "picture",
  ]);

  const token = jwt.sign(
    { HouseInfo: houseInfo },
    process.env.AUTH_ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.AUTH_ACCESS_TOKEN_EXPIRY }
  );

  return token;
};

module.exports = generateAccessToken;
