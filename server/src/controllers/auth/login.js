const House = require("../../models/House");
const sendResponse = require("../../utils/senResponse");

const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    const house = await House.findOne({ name });

    if (!house || house?.password !== password) {
      return sendResponse.failed(res, "Invalid credentials", null, 404);
    }

    const message =
      house?.status === "pending"
        ? "We're still processing your registration. Please wait for approval"
        : `Your account is ${house?.membershipStatus}!. Please contact admin. `;

    if (house?.status !== "active") {
      return sendResponse.failed(res, message, null, 403);
    }

    // TODO
    // create and attach jwts

    return sendResponse.success(res, `Login successful`, house, 200);
  } catch (error) {
    console.error(error);
    sendResponse.failed(res, "Server Error", error, 500);
  }
};

module.exports = login;
