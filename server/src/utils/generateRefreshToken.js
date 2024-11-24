require("dotenv").config();
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const generateRefreshToken = (house) => {
  const houseInfo = _.pick(house, ["_id", "name", "email"]);

  const token = jwt.sign(
    { HouseInfo: houseInfo },
    process.env.AUTH_REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.AUTH_REFRESH_TOKEN_EXPIRY }
  );

  return token;
};

module.exports = generateRefreshToken;
