const { User } = require("../../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

module.exports = {
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
};
