import * as y from "yup";

const notEmpty = "This field cannot be empty";
const loginSchema = y.object().shape({
  name: y.string().required(`${notEmpty}`),
  password: y.string().required(`${notEmpty}`),
});

export default loginSchema;
