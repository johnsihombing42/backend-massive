<<<<<<< HEAD
// const express = require("express");
// const router = express.Router();
// const cont = require("../../controllers/teacher/authentication");
// const middle = require("../../middleware/authorization");
// const roles = require("../../utils/roles");

// // router.post("/v1/parent/register", cont.auth.register);
// // router.get("/v1/parent/:code", cont.auth.getParent);
// // router.post("/v1/parent/login", cont.auth.login);
// // router.get("/v1/parent/", middle(roles.parent), cont.auth.getParentByToken);

// router.post("/v2/teacher/register", cont.register.register);
// router.post("/v2/teacher/login", cont.login.login);
// router.get("/v2/teacher/", middle(roles.teacher), cont.me.getMyProfile);
// module.exports = router;
=======
const express = require("express");
const router = express.Router();
const cont = require("../../controllers/teacher/authentication");
const middle = require("../../middleware/authorization");
const roles = require("../../utils/roles");

// router.post("/v1/parent/register", cont.auth.register);
// router.get("/v1/parent/:code", cont.auth.getParent);
// router.post("/v1/parent/login", cont.auth.login);
// router.get("/v1/parent/", middle(roles.parent), cont.auth.getParentByToken);

router.post("/v2/teacher/register", cont.register.register);
router.post("/v2/teacher/login", cont.login.login);
router.get("/v2/teacher/", middle(roles.teacher), cont.me.getMyProfile);
module.exports = router;
>>>>>>> 99daadf8502a2f588bfded3445d3998d3b356ff4
