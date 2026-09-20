const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const { resumeParser } = require("../controllers/resumeController.js");
const uploadMiddleware = require("../middlewares/uploadMiddleware.js");

const router = express.Router();

router.post("/parse", authMiddleware, uploadMiddleware, resumeParser);

module.exports = router;
