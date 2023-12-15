const { User } = require("../../../models");
const bcrypt = require("bcrypt");
const roles = require("../../../utils/roles");
const crypto = require("crypto");

module.exports = {
  register: async (req, res, next) => {
    try {
      const {
        username,
        email,
        password,
        confirmPassword,
        role = roles.student,
      } = req.body;

      const exist = await User.findOne({ where: { email } });
      if (exist)
        return res.status(400).json({
          status: false,
          message: "e-mail already in use!!!",
        });
      if (password != confirmPassword)
        return res.status(400).json({
          status: false,
          message: "password and confirm password doesn\t match!!!",
        });

      const code = crypto.randomBytes(2).toString("hex");

      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashPassword,
        confirm_password: confirmPassword,
        role,
        code,
      });

      return res.status(201).json({
        status: true,
        message: "account successfully registered",
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          code: user.code,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
