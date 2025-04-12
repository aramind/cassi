const dotenv = require("dotenv");
dotenv.config();

const keys = [
  "DEFAULT_VALUES",
  "HOUSE_TYPES",
  "MEMBERSHIP_TYPES",
  "MEMBERSHIP_STATUSES",
  "GENDER_OPTIONS",
  "VERSIONS",
  "ANNOUNCE_STATUSES",
  "ANNOUNCE_TYPES",
  "ANNOUNCE_IMPORTANCES",
];

const CONSTANTS = keys.reduce((acc, key) => {
  acc[key] = JSON.parse(process.env[key]);
  return acc;
}, {});

module.exports = CONSTANTS;
