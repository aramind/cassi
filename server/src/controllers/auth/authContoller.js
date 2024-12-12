const login = require("./login");
const refresh = require("./refresh");
const signup = require("./signup");

const authController = {
  signup,
  login,
  refresh,
};

module.exports = authController;
