const House = require("../../models/House");
const sendResponse = require("../../utils/senResponse");

const signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const existingName = await House.findOne({ name });
    if (existingName) {
      return sendResponse.failed(res, "Name already taken!");
    }

    const existingEmail = await House.findOne({ email });
    if (existingEmail) {
      return sendResponse.failed(res, "Email already taken!");
    }

    const newHouse = new House({
      email,
      name,
      password,
    });

    const createdHouse = await newHouse.save();

    sendResponse.success(
      res,
      `Thank you for joining! \nPlease wait approval via the email provided.`,
      createdHouse,
      201
    );

    return createdHouse;
  } catch (error) {
    console.error(error);
    sendResponse.failed(res, "Server Error", error, 500);
  }
};

module.exports = signup;
