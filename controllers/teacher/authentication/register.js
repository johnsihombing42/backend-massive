const { Teacher } = require("../../../models");
const bcrypt = require("bcrypt");
const roles = require("../../../utils/roles");
const crypto = require("crypto");
//username,email,password,confirmPassword,phone,role
module.exports = {
  register: async (req, res, next) => {
    try {
      const {
        fullname,
        username,
        email,
        password,
        confirmPassword,
        phone,
        role = roles.parent,
      } = req.body;
      const exist = await Teacher.findOne({ where: { email } });
      if (exist)
        return res.status(400).json({
          status: false,
          message: "e-mail already in use!!!",
        });
      if (password != confirmPassword)
        return res.status(400).json({
          status: false,
          message: "password and confirm password doesn't match!!!",
        });
      const hashPassword = await bcrypt.hash(password, 10);
      const parent = await Teacher.create({
        fullname,
        username,
        email,
        password: hashPassword,
        confirmPassword,
        phone,
        role,
      });
      return res.status(201).json({
        status: true,
        message: "account successfully registered",
        data: {
          id: parent.id,
          fullname: parent.fullname,
          username: parent.username,
          email: parent.email,
          role: parent.role,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
