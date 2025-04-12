const mongoose = require("mongoose");
const Occupant = require("./Occupant");
const House = require("./House");
const Schema = mongoose.Schema;
const CONSTANTS = require("../configs/constants");

const AnnouncementSchema = new Schema(
  {
    title: { type: String, default: "Untitled Announcement" },
    content: { type: String },
    house: { type: Schema.Types.ObjectId, ref: House, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: Occupant, required: true },
    revisions: {
      type: [
        {
          version: { type: String },
          date: { type: Date },
        },
      ],
      default: [],
    },

    isPinned: { type: Boolean, default: true },
    status: {
      type: String,
      enum: CONSTANTS?.ANNOUNCE_STATUSES || [
        "draft",
        "published",
        "archived",
        "deleted",
      ],
      default: CONSTANTS?.ANNOUNCE_STATUSES[0] || "draft",
    },
    type: {
      type: String,
      enum: CONSTANTS?.ANNOUNCE_TYPES || [
        "general",
        "rules",
        "emergency",
        "maintenance",
        "inquiry",
      ],
      default: CONSTANTS?.ANNOUNCE_TYPES[0] || "general",
    },
    importance: {
      type: String,
      enum: CONSTANTS?.ANNOUNCE_IMPORTANCES || ["low", "medium", "high"],
      default: CONSTANTS?.ANNOUNCE_IMPORTANCES[0] || "low",
    },
    version: {
      type: String,
      enum: CONSTANTS?.VERSIONS || ["v0", "v1", "v2"],
      default: CONSTANTS?.DEFAULT_VALUES?.version || "v0",
    },
    revisions: [
      {
        oldVersion: {
          title: { type: String },
          content: { type: String },
          type: { type: String },
          importance: { type: String },
        },
        date: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", AnnouncementSchema);
