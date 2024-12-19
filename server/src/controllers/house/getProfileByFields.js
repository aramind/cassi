const getByFields = require("../../services/common/getByFields");
const House = require("../../models/House");

const getProfileByFields = async (req, res) => {
  try {
    const { fields, ...queryParams } = req.query;
    const requestedFields = fields?.length > 0 ? fields.split(" , ") : [];

    const house = await getByFields(
      House,
      queryParams,
      requestedFields.join(" ")
    );
  } catch (error) {}
};

module.exports = getProfileByFields;
