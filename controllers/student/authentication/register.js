const bcrypt = require("bcrypt");
const roles = require("../../../utils/roles");
const crypto = require("crypto");
const query = require("../../../database/query");

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
      const isDuplicate = `SELECT * FROM users WHERE email = ?`;
      const [duplicate] = await query(isDuplicate, [email]);
      if (duplicate) {
        return res.status(400).json({
          status: false,
          message: "e-mail already in use!!!",
        });
      }
      if (password != confirmPassword)
        return res.status(400).json({
          status: false,
          message: "password and confirm password doesn\t match!!!",
        });
      const code = crypto.randomBytes(2).toString("hex");
      const hashPassword = await bcrypt.hash(password, 10);
      await query(
        `INSERT INTO users (username, email, password, confirmPassword, role, code) VALUES (?, ?, ?, ?, ?, ?)`,
        [username, email, hashPassword, confirmPassword, role, code]
      );
      return res.status(201).json({
        status: true,
        message: "account successfully registered",
        data: {
          username,
          email,
          role,
          code,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
