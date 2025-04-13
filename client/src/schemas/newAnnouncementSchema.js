import * as y from "yup";

const required = "This field is required";

const allowedTypes = [
  "general",
  "reminder",
  "rules",
  "emergency",
  "maintenance",
  "inquiry",
];
const allowedImportances = ["low", "medium", "high"];

const newAnnouncementSchema = y.object().shape({
  title: y.string().required(required),
  type: y.string(
    allowedTypes,
    `Type must be one of: ${allowedTypes.join(",").required(required)}`
  ),
  importance: y.string(
    allowedTypes,
    `Type must be one of: ${allowedImportances.join(",").required(required)}`
  ),
});

export default newAnnouncementSchema;
