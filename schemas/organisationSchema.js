const mongoose = require("mongoose");

const organisationSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, trim: true, required: true },

    description: {
      type: String,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = organisationSchema;
