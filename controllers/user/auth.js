const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

module.exports = {
  register: async (req, res, next) => {
    try {
      const {
        username,
        email,
        password,
        confirmPassword,
        role = "User",
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

      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashPassword,
        confirm_password: confirmPassword,
        role,
      });

      return res.status(201).json({
        status: true,
        message: "account successfully registered",
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const exist = await User.findOne({ where: { username } });
      if (!exist)
        return res.status(400).json({
          status: false,
          message: "username or password is wrong!!!",
        });

      const validPass = await bcrypt.compare(password, exist.password);
      if (!validPass)
        return res.status(400).json({
          status: false,
          message: "username or password is wrong!!!",
        });

      const token = jwt.sign(
        {
          id: exist.id,
          username: exist.username,
          email: exist.email,
          role: exist.role,
        },
        JWT_SECRET_KEY,
        { expiresIn: "2h" }
      );

      return res.status(200).json({
        status: true,
        message: "login successfully",
        data: {
          id: exist.id,
          username: exist.username,
          email: exist.email,
          role: exist.role,
          token,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
