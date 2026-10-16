const userService = require("../services/userService.js");

const registerUser = async (req, res, next) => {
  console.log("user", req.body);
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res, next) => {
  try {
    console.log("login controller");
    const user = await userService.login(req.body);
    const { email, role, accessToken } = user;

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      success: true,
      message: "Logged in successfully!",
      data: { email, role },
    });
  } catch (error) {
    res.status(500).json({ error: `Unable to login ${error.message}` });
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await userService.getMe(req.user);
    res.status(200).json({
      success: true,
      message: "User data fetched successfully!",
      data: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Unable to fetch user data ${error.message}` });
  }
};

const updateMe = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateMe(req.user, req.body);
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    re.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, login, getMe, updateMe };
