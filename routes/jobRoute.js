const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const {
  createJob,
  findJobById,
  updateJob,
} = require("../controllers/jobController.js");

const router = express.Router();

router.post("/create-job", authMiddleware, createJob);

router.get("/:id", authMiddleware, findJobById);

router.put("/:id", updateJob);

module.exports = router;
