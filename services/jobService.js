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

const searchJobs = async (queryParams) => {
  try {
    const {
      keyword,
      location,
      skills,
      employmentType,
      experience,
      minSalary,
      maxSalary,
      organisation,
      status = "active",
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = queryParams;

    const filter = { status };

    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (skills) {
      const skillArray = skills.split(",").map((skill) => skill.trim());
      filter.skills = { $in: skillArray };
    }

    if (employmentType) {
      filter.employmentType = employmentType;
    }

    if (experience) {
      filter.experience = experience;
    }

    if (minSalary || maxSalary) {
      filter["salary.min"] = {};
      if (minSalary) {
        filter["salary.min"].$gte = Number(minSalary);
      }
      if (maxSalary) {
        filter["salary.min"].$lte = Number(maxSalary);
      }
    }
    if (organisation) {
      filter.organisation = organisation;
    }
    console.log(filter);
    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const [jobs, jobsCount] = await Promise.all([
      Job.find(filter)
        .sort(sort)
        .populate("organisation", "name -_id")
        .skip(skip)
        .limit(limit)
        .select(
          "title description skills salary location organisation experience employmentType -_id",
        ),

      Job.countDocuments(filter),
    ]);

    return [jobs, jobsCount];
  } catch (error) {
    throw new Error(error.message);
  }
};

const exploreJobs = async () => {
  try {
    const jobs = await Job.aggregate([
      { $match: { status: "active" } },
      {
        $facet: {
          jobs: [
            { $limit: 10 },
            {
              $lookup: {
                localField: "organisation",
                from: "organisations",
                foreignField: "_id",
                as: "organisation",
              },
            },

            {
              $project: {
                title: 1,
                description: 1,
                location: 1,
                employmentType: 1,
                experience: 1,
                salary: 1,
                skills: 1,
                status: 1,
                _id: 0,

                organisation: { name: 1 },
              },
            },

            {
              $unwind: "$organisation",
            },
          ],
          locations: [{ $group: { _id: "$location" } }],

          employmentTypes: [{ $group: { _id: "$employmentType" } }],
        },
      },
    ]);
    return jobs;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createJob, findJobById, updateJob, searchJobs, exploreJobs };
