const express = require("express");
const { google, googleCallback } = require("../controllers/authController");

const router = express.Router();

router.get("/google", google);

router.get("/google/callback", googleCallback);

module.exports = router;
