const resumeService = require("../services/resumeService.js");

const resumeParser = async (req, res, next) => {
  try {
    console.log(req.file);
    const parsed = await resumeService.resumeParser(req.file);
    console.log(parsed);
    res
      .status(200)
      .json({ success: true, message: "Parsed successfully!", data: parsed });
  } catch (error) {
    res.status(501).json({ success: false, message: error.message });
  }
};

module.exports = { resumeParser };
