const { Parent, User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;
const roles = require("../../utils/roles");

module.exports = {
  register: async (req, res, next) => {
    try {
      const {
        username,
        email,
        password,
        confirmPassword,
        code_student,
        role = roles.parent,
      } = req.body;

      const exist = await Parent.findOne({ where: { email } });
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
      const user = await Parent.create({
        username,
        email,
        password: hashPassword,
        confirm_password: confirmPassword,
        role,
        code_student,
      });

      return res.status(201).json({
        status: true,
        message: "account successfully registered",
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          code_student: user.code_student,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const parent = await Parent.findOne({ where: { username } });
      if (!parent)
        return res.status(400).json({
          status: false,
          message: "username not found!!!",
        });

      const isMatch = await bcrypt.compare(password, parent.password);
      if (!isMatch)
        return res.status(400).json({
          status: false,
          message: "password doesn't match!!!",
        });

      const payload = {
        id: parent.id,
        username: parent.username,
        email: parent.email,
        role: parent.role,
        code_student: parent.code_student,
      };

      const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });

      return res.status(200).json({
        status: true,
        message: "login success",
        data: {
          token,
          id: parent.id,
          username: parent.username,
          email: parent.email,
          role: parent.role,
          code_student: parent.code_student,
        },
      });
    } catch (err) {
      console.log(err);
    }
  },

  getParent: async (req, res, next) => {
    const { code } = req.params;
    try {
      const parent = await Parent.findOne({ where: { code_student: code } });
      const student = await User.findOne({
        where: { code: parent.code_student },
      });
      if (!parent)
        return res.status(400).json({
          status: false,
          message: "code student not found!!!",
        });
      return res.status(200).json({
        status: true,
        message: "success",
        data: {
          id: parent.id,
          username: parent.username,
          email: parent.email,
          role: parent.role,
          code_student: parent.code_student,
          student: {
            id: student.id,
            username: student.username,
            email: student.email,
            role: student.role,
            code: student.code,
          },
        },
      });
    } catch (err) {
      next(err);
    }
  },

  getParentByToken: async (req, res, next) => {
    const id = req.user.id;
    try {
      const parent = await Parent.findOne({ where: { id } });
      const student = await User.findOne({
        where: { code: parent.code_student },
      });
      if (!parent)
        return res.status(400).json({
          status: false,
          message: "parent not found!!!",
        });
      return res.status(200).json({
        status: true,
        message: "success",
        data: {
          id: parent.id,
          username: parent.username,
          email: parent.email,
          role: parent.role,
          code_student: parent.code_student,
          student: {
            id: student.id,
            username: student.username,
            email: student.email,
            role: student.role,
            code: student.code,
          },
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
