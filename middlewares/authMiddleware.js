const jwt = require("jsonwebtoken");
const authMiddleWare = (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
      return res.status(401).json({
        success: false,
        message: "AccessToken is missing in the headers!",
      });
    }
    const accessToken = authHeaders.split(" ")[1];

    const verified = jwt.verify(accessToken, process.env.JWT_SECRET);

    console.log(verified);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Invalid token or expired!`,
    });
  }
};

module.exports = authMiddleWare;
