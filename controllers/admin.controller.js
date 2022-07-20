const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const adminModel = require("../model/admin.model");

// add admin information controller

exports.addAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassowrd = await bcrypt.hash(password, 10);
  const admin = new adminModel({
    userName: name,
    email,
    password: hashedPassowrd,
  });
  await admin.save();
  res.send(admin);
};

// admin login controller
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const user = await adminModel.findOne({ email });
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (isPasswordMatched) {
    const token = jwt.sign({ email, role: user.role }, process.env.LOGIN_TOKEN);
    return res.status(StatusCodes.OK).send({ success: true, token });
  }
  return res
    .status(StatusCodes.FORBIDDEN)
    .send({ success: false, message: "not authorized to login" });
};

// update admin information controller
exports.updateAdmin = async (req, res) => {
  const { newEmail, newPassword, oldEmail, oldPassword } = req.body;
  const filter = { email: oldEmail };
  console.log(req.body);
  const currentUser = await adminModel.findOne(filter);
  console.log(currentUser);
  const isPasswordMatched = await bcrypt.compare(
    oldPassword,
    currentUser.password
  );

  if (currentUser && isPasswordMatched) {
    const hashedPassowrd = await bcrypt.hash(newPassword, 10);
    const updatedDoc = {
      $set: {
        email: newEmail,
        password: hashedPassowrd,
      },
    };
    const result = await adminModel.findOneAndUpdate(filter, updatedDoc);
    if (!result) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .send({ success: false, message: "user not updated" });
    }
    return res
      .status(StatusCodes.OK)
      .send({ success: true, message: "user updated" });
  }
  return res
    .status(StatusCodes.FORBIDDEN)
    .send({ success: false, message: "user not updated" });
};

// check user is admin
exports.isAdmin = async (req, res) => {
  const { role } = req.decoded;
  if (role === "admin") {
    return res.status(StatusCodes.OK).send({ success: true, admin: true });
  }
  return res
    .status(StatusCodes.FORBIDDEN)
    .send({ success: false, admin: false });
};
