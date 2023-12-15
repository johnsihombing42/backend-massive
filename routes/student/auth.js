const express = require("express");
const router = express.Router();
const cont = require("../../controllers/student/authentication");
// const cont1 = require("../../controllers/student");
const middle = require("../../middleware/authorization");
const roles = require("../../utils/roles");

// router.post("/v1/student/register", cont1.auth.register);
// router.post("/v1/student/login", cont1.auth.login);
// router.get("/v1/student/", middle(roles.student), cont1.auth.myProfile);
// router.get("/v1/student/all", middle(roles.student), cont1.auth.getAllStudent);
router.post("/v2/student/register", cont.register.register);
router.post("/v2/student/login", cont.login.login);
// router.get("/v2/student/", middle(roles.student), cont.me.getMyProfile);
// router.post("/v2/student/reset-password", cont.resetPassword.resetPassword);
// router.post("/v2/student/update-password", cont.updatePassword.updatePassword);

module.exports = router;
