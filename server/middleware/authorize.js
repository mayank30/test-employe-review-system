const jwt = require("jsonwebtoken");
const constants = require("../config/constants");

module.exports = (roles = []) => {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User','Super Admin'])
  if (typeof roles === "string") {
    roles = [roles];
  }
  return (req, res, next) => {
    const token = req.body.token || req.headers[constants.TOKEN_HEADER_KEY]; // || req.query.userToken
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, constants.JWT_SECRET, function (error, decoded) {
        if (error) {
          return res.status(203).json({
            error: "Token Expired",
            code: "TOKEN EXPIRED",
          });
        }
        console.log("=====TOKEN======22");
        console.log(decoded);
        console.log("=====TOKEN====24");
        req.tokenData = decoded;
        req.body.byEmployee = {
          id: decoded.id,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          email: decoded.email,
          role: decoded.role,
        };
        // role provided
        if (roles.length && !roles.some((r) => decoded.role.includes(r))) {
          // Not found in roles
          return res.status(203).json({
            error: "Not authorized to access resources",
            code: "UNAUTHORIZE ACCESS",
          });
        }
        next();
      });
    } else {
      return res.status(203).json({
        error: "Token is missing",
        code: "TOKEN NOT FOUND",
      });
    }
  };
};
