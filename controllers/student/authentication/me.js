const { User } = require("../../../models");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const { id } = req.user;
      const user = await User.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "confirmPassword"],
        },
      });
      return res.status(200).json({
        status: true,
        message: "success get user profile data",
        data: user,
      });
    } catch {
      next(err);
    }
  },
};
