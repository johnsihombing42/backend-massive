const express = require("express");
const router = express.Router();
const cont = require("../controllers/user/");
// const middle = require("../middlewares/authorize");
// const roles = require("../utils/roles");

router.post("/register", cont.auth.register);
router.post("/login", cont.auth.login);

module.exports = router;
