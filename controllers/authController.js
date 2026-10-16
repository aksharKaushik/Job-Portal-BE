const authService = require("../services/googleAuthService.js");

const google = async (req, res, next) => {
  try {
    const authUrl = await authService.google();
    console.log(authUrl);
    res.redirect(authUrl);
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const googleCallback = async (req, res, next) => {
  try {
    console.log("google call back API called", req.query);
    const user = await authService.googleCallback(req.query.code);

    res.cookie("accessToken", user.accesstoken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.redirect("http://localhost:3000/dashboard");
  } catch (error) {
    // res
    //   .status(500)
    //   .json({ success: false, message: "Logged in failed, Please try again!" });

    return res.redirect(
      "http://localhost:3000/login?error=google_login_failed",
    );
  }
};

module.exports = { google, googleCallback };
