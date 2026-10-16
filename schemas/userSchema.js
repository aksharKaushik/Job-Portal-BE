const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
    },

    role: {
      type: String,
      enum: ["jobseeker", "recruiter"],
      default: "jobseeker",
    },
    experience: {
      type: Number,
      min: 0,
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organisation",
      required: function () {
        return this.role === "recruiter";
      },
    },

    skills: {
      type: [String],
      required: function () {
        return this.role === "jobseeker";
      },
    },

    prefferedLocation: {
      type: [String],
      required: function () {
        return this.role === "jobseeker";
      },
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },

  {
    timestamps: true,
  },
);

module.exports = userSchema;
