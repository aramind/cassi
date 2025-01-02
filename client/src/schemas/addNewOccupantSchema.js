import * as y from "yup";

const required = "This field is required";
const invalidEmail = "Invalid email";
const invalidDate = "Invalid date format";

const addNewOccupantSchema = y.object().shape({
  name: y.object({
    firstName: y.string().required(required),
    lastName: y.string().required(required),
  }),
  email: y.string().email(invalidEmail).optional(),
  emergencyContact: y.object({
    email: y.string().email(invalidEmail).optional(),
  }),
  dateOfBirth: y
    .string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, invalidDate)
    .optional(),
});

export default addNewOccupantSchema;
