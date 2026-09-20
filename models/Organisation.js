const mongoose = require("mongoose");
const organisationSchema = require("../schemas/organisationSchema.js");

const Organisation = mongoose.model("Organisation", organisationSchema);

module.exports = Organisation;
