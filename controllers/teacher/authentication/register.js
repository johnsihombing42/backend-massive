const bcrypt = require("bcrypt");
const query = require("../../../database/query");
const roles = require("../../../utils/roles");
//username,email,password,confirmPassword,phone,role
module.exports = {
  register: async (req, res) => {
    try {
      const {
        username,
        email,
        password,
        confirmPassword,
        phone,
        role = roles.teacher,
      } = req.body;
      const isExist = `SELECT * FROM teachers WHERE username = ?`;
      const [exist] = await query(isExist, [username]);
      if (exist) {
        return res.status(400).json({
          status: false,
          message: "username already exist!!!",
        });
      }
      if (password != confirmPassword)
        return res.status(400).json({
          status: false,
          message: "password and confirm password doesn't match!!!",
        });
      const hashPassword = await bcrypt.hash(password, 10);
      await query(
        `INSERT INTO teachers (username, email, password, confirmPassword, phone,role) VALUES (?, ?, ?, ?, ?, ?)`,
        [username, email, hashPassword, confirmPassword, phone, role]
      );
      return res.status(201).json({
        status: true,
        message: "account successfully registered",
        data: {
          username,
          email,
          role,
          phone,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};
