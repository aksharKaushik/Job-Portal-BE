require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db.js");
const userRoute = require("./routes/userRoute.js");
const jobRoute = require("./routes/jobRoute.js");
const resumeRoute = require("./routes/resumeRoute.js");

connectDB();

app.use(express.json());

app.get("/", (req, res, next) => {
  console.log("get API called");
  res.status(200).send("Welcome to Job Portal Server");
});

app.use("/api/users", userRoute);

app.use("/api/jobs", jobRoute);

app.use("/api/resume", resumeRoute);

app.listen(process.env.PORT, () =>
  console.log(`Job Portal Server is running on ${process.env.PORT}`),
);
