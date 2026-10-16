const express = require("express");
const {
  registerUser,
  login,
  getMe,
  updateMe,
} = require("../controllers/userController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.post("/create-user", registerUser);

router.post("/login", login);

router.get("/me", authMiddleware, getMe);

router.put("/me", authMiddleware, updateMe);

module.exports = router;
