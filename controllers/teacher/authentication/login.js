const { Teacher } = require("../../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;
module.exports = {
  login: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const exist = await Teacher.findOne({ where: { email } });
      if (!exist) {
        return res.status(400).json({
          status: false,
          message: "email or password is wrong!!!",
        });
      }
      const validPass = await bcrypt.compare(password, exist.password);
      if (!validPass) {
        return res.status(400).json({
          status: false,
          message: "email or password is wrong!!!",
        });
      }
      const token = jwt.sign(
        {
          id: exist.id,
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
