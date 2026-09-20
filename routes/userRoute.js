const express = require("express");
const {registerUser, login} = require("../controllers/userController.js")
const router = express.Router();

router.post("/create-user", registerUser);

router.post("/login", login);

module.exports = router;