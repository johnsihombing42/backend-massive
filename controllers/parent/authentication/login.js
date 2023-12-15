<<<<<<< HEAD
// const bcrypt = require("bcrypt");
// const query = require("../../../database/query");
// const jwt = require("jsonwebtoken");

// module.exports = {
//   login: async (req, res, next) => {
//     try {
//       const { username, password } = req.body;
//       const isExist = `SELECT * FROM parents WHERE username = ?`;
//       const [exist] = await query(isExist, [username]);
//       if (!exist) {
//         return res.status(400).json({
//           status: false,
//           message: "username not found!!!",
//         });
//       }
//       const isMatch = await bcrypt.compare(password, exist.password);
//       if (!isMatch) {
//         return res.status(400).json({
//           status: false,
//           message: "password doesn't match!!!",
//         });
//       }
//       const token = jwt.sign(
//         {
//           id: exist.id,
//           username: exist.username,
//           email: exist.email,
//           role: exist.role,
//         },
//         process.env.JWT_SECRET_KEY,
//         {
//           expiresIn: "1d",
//         }
//       );
//       return res.status(200).json({
//         status: true,
//         message: "login successfully",
//         data: {
//           id: exist.id,
//           username: exist.username,
//           email: exist.email,
//           role: exist.role,
//           token,
//         },
//       });
//     } catch (err) {
//       next(err);
//     }
//   },
// };
=======
const bcrypt = require("bcrypt");
const query = require("../../../database/query");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const isExist = `SELECT * FROM parents WHERE username = ?`;
      const [exist] = await query(isExist, [username]);
      if (!exist) {
        return res.status(400).json({
          status: false,
          message: "username not found!!!",
        });
      }
      const isMatch = await bcrypt.compare(password, exist.password);
      if (!isMatch) {
        return res.status(400).json({
          status: false,
          message: "password doesn't match!!!",
        });
      }
      const token = jwt.sign(
        {
          id: exist.id,
          username: exist.username,
          email: exist.email,
          role: exist.role,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
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
>>>>>>> 99daadf8502a2f588bfded3445d3998d3b356ff4
