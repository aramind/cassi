const { default: mongoose } = require("mongoose");
const CONSTANTS = require("../configs/constants");
const HouseOccupant = require("./HouseOccupant");
const House = require("./House");

const Schema = mongoose.Schema;

const TYPES = CONSTANTS?.TASK_TYPES || [
  "general",
  "cleaning",
  "maintenance",
  "bills",
  "others",
];
const STATUSES = CONSTANTS?.TASK_STATUSES || [
  "pending",
  "in-progress",
  "completed",
  "cancelled",
  "deleted",
];
const PRIORITIES = CONSTANTS?.TASK_PRIORITIES || [
  "low",
  "medium",
  "high",
  "urgent",
];
const RECURRENCE_RULES = CONSTANTS?.TASK_RECURRENCE_RULES || [
  "daily",
  "weekly",
  "monthly",
  "annually",
];

const VERSIONS = CONSTANTS?.VERSIONS || ["v0", "v1", "v2"];

const TaskSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String },
    house: { type: Schema.Types.ObjectId, ref: House, required: true },
    type: {
      type: String,
      enum: TYPES,
      default: TYPES[0],
    },
    status: {
      type: String,
      enum: STATUSES,
      default: STATUSES[0],
    },
    priority: {
      type: String,
      enum: PRIORITIES,
      default: PRIORITIES[0],
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: HouseOccupant,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: HouseOccupant,
    },
    dueDate: {
      type: Date,
    },
    attachments: { type: [String], default: [] },
    remarks: { type: [String], default: [] },
    comments: {
      type: [
        {
          comment: { type: String, default: "" },
          date: { type: Date, default: Date.now },
        },
      ],
      default: () => [{ comment: "", date: Date.now() }],
    },
    isRecurring: { type: Boolean, default: false },
    recurrenceRule: { type: String, enum: RECURRENCE_RULES },
    version: {
      type: String,
      enum: VERSIONS,
      default: CONSTANTS?.DEFAULT_VALUES?.version || "v0",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
