const query = require("../../../database/query");
module.exports = {
  getMyProfile: async (req, res, next) => {
    try {
      const id = req.user.id;
      const getProfile = `SELECT * FROM parents WHERE id = ?`;
      const [profile] = await query(getProfile, [id]);
      if (!profile) {
        return res.status(400).json({
          status: false,
          message: "user not found",
        });
      }
      return res.status(200).json({
        status: true,
        message: "success get student profile data",
        data: {
          id: profile.id,
          username: profile.username,
          email: profile.email,
          role: profile.role,
          code: profile.code_student,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
