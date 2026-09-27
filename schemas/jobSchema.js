const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organisation",
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    salary: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
    },

    skills: {
      type: [String],
      required: true,
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

jobSchema.index({ title: 1, status: 1, location: 1 });
module.exports = jobSchema;
