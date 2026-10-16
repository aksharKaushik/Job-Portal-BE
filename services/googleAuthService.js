const { googleClient } = require("../utils/helpers");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const google = async () => {
  const authUrl = await googleClient.generateAuthUrl({
    access_type: "offline",
    scope: ["openid", "email", "profile"],
  });

  return authUrl;
};

const googleCallback = async (code) => {
  try {
    console.log("code", code);
    const { tokens } = await googleClient.getToken(code);
    console.log("tokens", tokens);
    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log("ticket", ticket);
    const payload = ticket.getPayload();

    console.log("payload", payload);

    const { sub: googleId, email, name } = payload;

    console.log(googleId);

    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.findOne({ email });
    }

    if (!user) {
      user = await User.create({
        googleId,
        email,
        name,
        authProvider: "google",
        role: "jobseeker",
      });
    }

    const accesstoken = await jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
        organisation: user.organisation,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    
    return { email, role: user.role, accesstoken };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { google, googleCallback };
