import * as y from "yup";

const required = "This field is required";

const allowedTypes = [
  "general",
  "reminder",
  "rules",
  "emergency",
  "maintenance",
  "inquiry",
  "others",
];

const newAnnouncementSchema = y.object().shape({
  title: y.string().required(required),
  type: y
    .string()
    .oneOf(allowedTypes, `Type must be one of: ${allowedTypes.join(",")}`)
    .required(required),
});

export default newAnnouncementSchema;
