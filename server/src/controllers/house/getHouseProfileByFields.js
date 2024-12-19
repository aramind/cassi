const House = require("../../models/House");
const getByFields = require("../../services/common/getByFields");
const sendResponse = require("../../utils/senResponse");

const getHouseProfileByFields = async (req, res) => {
  try {
    const { fields, ...queryParams } = req.query;
    const requestedFields = fields?.length > 0 ? fields.split(" , ") : [];

    const houses = await getByFields(
      House,
      queryParams,
      requestedFields.jon(" ")
    );

    if (!houses || houses.length === 0) {
      return sendResponse.failed(res, "No house(s) found.", null, 404);
    }

    return sendResponse.success(
      res,
      "House(s) profile retrieved successfully",
      houses,
      200
    );
  } catch (error) {
    console.log(error);
    return sendResponse.failed(
      res,
      "Internal Server Error: Retrieving house(s) profile(s)",
      error,
      500
    );
  }
};

module.exports = getHouseProfileByFields;
