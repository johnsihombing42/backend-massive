const jwt = require("jsonwebtoken");

module.exports = (roles = []) => {
  if (typeof roles === "string") roles = [roles];
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];
      if (!token)
        return res.status(401).json({
          status: false,
          message: "access denied, token not available",
        });
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err)
          return res.status(403).json({
            status: false,
            message: err.message,
          });
        req.user = user;
        if (roles.length && !roles.includes(user.role)) {
          return res.status(401).json({
            status: false,
            message:
              "access denied, you are not authorized to access this resource",
          });
        }
        next();
      });
    } catch (err) {
      next(err);
    }
  };
};

// verifyToken: async (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     const token = authHeader && authHeader.split(" ")[1];
//     if (!token)
//       return res.status(401).json({
//         status: false,
//         message: "access denied, token not available",
//       });
//     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
//       if (err)
//         return res.status(403).json({
//           status: false,
//           message: err.message,
//         });
//       req.user = user;
//       next();
//     });
//   },
