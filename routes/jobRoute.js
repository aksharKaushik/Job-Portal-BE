const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const {
  createJob,
  findJobById,
  updateJob,
  searchJobs,
  exploreJobs,
  matchingJobs,
} = require("../controllers/jobController.js");

const router = express.Router();

router.post("/create-job", authMiddleware, createJob);
router.get("/search", authMiddleware, searchJobs);
router.get("/explore", authMiddleware, exploreJobs);
router.get("/matchingJobs", authMiddleware, matchingJobs);

router.get("/:id", authMiddleware, findJobById);

router.put("/:id", updateJob);

module.exports = router;
