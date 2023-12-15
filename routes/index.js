var express = require("express");
var router = express.Router();
const authStudent = require("./student/auth");
// const authParent = require("./parent/auth");
// const authTeacher = require("./teacher/auth");

router.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    version: "1.0",
    message:
      "Welcome to Backend Massive Project, please read the documentation to use this API ",
  });
});

router.use("/api", authStudent);

module.exports = router;
