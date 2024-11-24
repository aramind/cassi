const login = require("./login");
const signup = require("./signup");

const authController = {
  signup,
  login,
};

module.exports = authController;
