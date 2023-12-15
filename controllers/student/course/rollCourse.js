const query = require("../../../utils/query");

module.exports = {
  rollCourse: async (req, res) => {
    const { id } = req.params;
    const { course_id } = req.body;
    try {
      const result = await query(
        `INSERT INTO student_course (student_id, course_id) VALUES (${id}, ${course_id})`
      );
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
