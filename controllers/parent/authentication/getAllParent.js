const query = require("../../../database/query");

module.exports = {
  getAllParent: async (req, res, next) => {
    try {
      const getAllParent = `SELECT parents.id, parents.username, parents.email, parents.role, students.code_student FROM parents JOIN students ON parents.id = students.parent_id`;
      const [allParent] = await query(getAllParent);
      if (!allParent) {
        return res.status(400).json({
          status: false,
          message: "parent not found",
        });
      }
      const result = [...allParent];
      return res.status(200).json({
        status: true,
        message: "success get all parent data",
        data: result,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};
