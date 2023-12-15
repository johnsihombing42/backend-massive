const query = require("../../../database/query");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  updatePassword: async (req, res, next) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const id = req.user.id;
      const isExist = `SELECT * FROM users WHERE id = ?`;
      const [exist] = await query(isExist, [id]);
      if (!exist) {
        return res.status(400).json({
          status: false,
          message: "user not found",
        });
      }
      const isMatch = await bcrypt.compare(oldPassword, exist.password);
      if (!isMatch) {
        return res.status(400).json({
          status: false,
          message: "password doesn't match",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      const updatePassword = `UPDATE users SET password = ? WHERE id = ?`;
      await query(updatePassword, [hashedPassword, id]);
      return res.status(200).json({
        status: true,
        message: "success update password",
      });
    } catch (err) {
      next(err);
    }
  },
};
