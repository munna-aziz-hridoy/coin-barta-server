const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

exports.verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .send({ success: false, message: "not authorized" });
  }
  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.LOGIN_TOKEN, (err, decoded) => {
    if (err) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .send({ success: false, message: "not authorized" });
    }
    if (decoded.role !== "admin") {
      return res
        .status(StatusCodes.FORBIDDEN)
        .send({ success: false, message: "not authorized" });
    }
    req.decoded = decoded;
    next();
  });
};
