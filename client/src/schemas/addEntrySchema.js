import * as y from "yup";

const required = "This field is required";
const invalidDate = "Invalid date format";

const addEntrySchema = y.object().shape({
  deprecatedPropType: y
    .string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, invalidDate)
    .required(required),
  originalAssignee: y.string().required(required),
  comments: y.string(),
});

export default addEntrySchema;
