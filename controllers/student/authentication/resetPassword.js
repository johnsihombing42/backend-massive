const query = require("../../../database/query");
const jwt = require("jsonwebtoken");

module.exports = {
  resetPassword: async (req, res, next) => {
    try {
      const { email } = req.body;
      const isExist = `SELECT * FROM users WHERE email = ?`;
      const [exist] = await query(isExist, [email]);
      if (!exist) {
        return res.status(400).json({
          status: false,
          message: "email not found!!!",
        });
      }
      const token = jwt.sign(
        {
          id: exist.id,
          email: exist.email,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      const link = `http://localhost:3000/student/reset-password?token=${token}`;
      const nodemailer = require("nodemailer");
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Reset Password",
        html: `<p>Click <a href="${link}">here</a> to reset your password</p>`,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });
      return res.status(200).json({
        status: true,
        message: "success send email",
      });
    } catch {}
  },
};
