const jwt = require("jsonwebtoken");
require("dotenv").config();
const sendResponse = require("../utils/senResponse");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer")) {
    return sendResponse.failed(res, "Unknown Authorization", null, 401);
  } else {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.AUTH_ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (err.message === "jwt expired") {
        }
        return sendResponse.failed(res, "Unauthorize access", err, 403);
      }

      req.credentials = decoded.HouseInfo;

      next();
    });
  }
};

module.exports = verifyJWT;
