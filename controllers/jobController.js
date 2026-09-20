const jobService = require("../services/jobService.js");

const createJob = async (req, res, next) => {
  try {
    const jobCreated = await jobService.createJob(req.user, req.body);
    res.status(201).json({
      success: true,
      message: "Job created successfully!",
      data: jobCreated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const findJobById = async (req, res, next) => {
  try {
    const job = await jobService.findJobById(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Job fetched successfully!", data: job });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Could not find job ${error.message}` });
  }
};

const updateJob = async (req, res, next) => {
  try {
    const updatedJob = await jobService.updateJob(
      req.session.userId,
      req.params.id,
      req.body,
    );
    res.status(200).json({
      success: true,
      message: "Job updated successfully!",
      data: updatedJob,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Cannot update job ${error.message}` });
  }
};

module.exports = { createJob, findJobById, updateJob };
