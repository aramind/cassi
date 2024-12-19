const getByFields = async (
  model,
  queryParams,
  requestFields,
  populateOptions
) => {
  return (documents = await model.find(
    queryParams,
    requestFields,
    populateOptions
  ));
};

module.exports = getByFields;
