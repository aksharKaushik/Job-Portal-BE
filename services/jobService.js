const mongoose = require("mongoose");
const Job = require("../models/Job.js");
const User = require("../models/User.js");

const createJob = async (user, data) => {
  try {
    // const user = User.findById(userId);

    data.organisation = user.organisation;

    data.postedBy = user._id;

    console.log("data", user, data);

    const jobCreated = await Job.create(data);

    return jobCreated;
  } catch (error) {
    throw new Error(`Job not created ${error.message}`);
  }
};

const findJobById = async (jobId) => {
  try {
    const job = await Job.findById(jobId);
    return job;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateJob = async (userId, jobId, data) => {
  try {
    const job = await Job.findById(jobId);
    const updatedJob = await Job.findByIdAndUpdate(jobId, data);
    return updatedJob;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = { createJob, findJobById, updateJob };
