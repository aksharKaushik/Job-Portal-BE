const mongoose = require("mongoose");
const jobSchema = require("../schemas/jobSchema.js")

const Job = mongoose.model("Job",jobSchema)

module.exports = Job;