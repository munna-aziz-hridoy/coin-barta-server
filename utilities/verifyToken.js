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
  console.log(token);
  jwt.verify(token, process.env.LOGIN_TOKEN, (err, decoded) => {
    console.log(decoded);
    if (err) {
      console.log(err.message);
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
