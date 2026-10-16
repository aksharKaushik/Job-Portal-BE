const jwt = require("jsonwebtoken");
const authMiddleWare = (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;

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
