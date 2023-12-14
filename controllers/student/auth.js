const { User, sequelize } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const roles = require("../../utils/roles");
const { JWT_SECRET_KEY } = process.env;
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
        { expiresIn: "4h" }
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

  getAllStudent: async (req, res, next) => {
    try {
      // const user = await User.findAll({ where: { role: roles.student } });
      const user = await sequelize.query(
        `SELECT * FROM users WHERE role = 'student' ORDER BY id DESC`,
        { type: sequelize.QueryTypes.SELECT }
      );
      return res.status(200).json({
        status: true,
        message: "success get all user data",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },

  // getStudentById: async (req, res, next) => {
  //   try {
  //     const { id } = req.params;
  //     const user = await User.findOne({ where: { id } });
  //     return res.status(200).json({
  //       status: true,
  //       message: "success get user data",
  //       data: {
  //         id: user.id,
  //         username: user.username,
  //         email: user.email,
  //         role: user.role,
  //       },
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  // getAllStudent: async (req, res, next) => {
  //   try {
  //     const user = await User.findAll();
  //     return res.status(200).json({
  //       status: true,
  //       message: "success get all user data",
  //       data: user,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  myProfile: async (req, res, next) => {
    try {
      const id = req.user.id;
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "user not found",
        });
      }
      return res.status(200).json({
        status: true,
        message: "success get student profile data",
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
};
