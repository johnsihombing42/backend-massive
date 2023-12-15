const query = require("../../../database/query");
module.exports = {
  getMyProfile: async (req, res, next) => {
    try {
      const id = req.user.id;
      const getProfile = `SELECT * FROM teachers WHERE id = ?`;
      const [profile] = await query(getProfile, [id]);
      if (!profile) {
        return res.status(400).json({
          status: false,
          message: "teacher not found",
        });
      }
      return res.status(200).json({
        status: true,
        message: "success get teacher profile data",
        data: {
          id: profile.id,
          username: profile.username,
          email: profile.email,
          role: profile.role,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
