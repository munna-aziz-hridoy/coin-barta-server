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
  if (!user) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .send({ success: false, message: "not authorized to login" });
  }
  const isPasswordMatched = await bcrypt.compare(password, user?.password);
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
  const requestedUserEmail = req.decoded.email;
  const { email, newPassword, oldPassword } = req.body;
  const filter = { email: requestedUserEmail };
  const currentUser = await adminModel.findOne(filter);
  let updatedDoc;
  if (!email && !newPassword && !oldPassword) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .send({ success: false, message: "no value inputed" });
  }
  if (!newPassword && !oldPassword) {
    updatedDoc = {
      $set: {
        email,
      },
    };
  }
  if (!email && newPassword && oldPassword) {
    const isPasswordMatched = await bcrypt.compare(
      oldPassword,
      currentUser.password
    );
    if (isPasswordMatched) {
      const hashedPassowrd = await bcrypt.hash(newPassword, 10);
      updatedDoc = {
        $set: {
          password: hashedPassowrd,
        },
      };
    } else {
      return res
        .status(StatusCodes.FORBIDDEN)
        .send({ success: false, message: "user not updated" });
    }
  }
  if (email && newPassword && oldPassword) {
    const isPasswordMatched = await bcrypt.compare(
      oldPassword,
      currentUser.password
    );
    if (isPasswordMatched) {
      const hashedPassowrd = await bcrypt.hash(newPassword, 10);
      updatedDoc = {
        $set: {
          email,
          password: hashedPassowrd,
        },
      };
    } else {
      return res
        .status(StatusCodes.FORBIDDEN)
        .send({ success: false, message: "user not updated" });
    }
  }

  const result = await adminModel.findOneAndUpdate(filter, updatedDoc);
  if (!result) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .send({ success: false, message: "user not updated" });
  }
  const updatedUserInfo = await adminModel.findOne({ email });
  const token = jwt.sign(
    { email: updatedUserInfo?.email, role: updatedUserInfo?.role },
    process.env.LOGIN_TOKEN
  );

  return res
    .status(StatusCodes.OK)
    .send({ success: true, message: "user updated", token });
};

// check user is admin
exports.isAdmin = async (req, res) => {
  const { role, email } = req.decoded;

  if (role === "admin") {
    return res
      .status(StatusCodes.OK)
      .send({ success: true, admin: true, email });
  }
  return res
    .status(StatusCodes.FORBIDDEN)
    .send({ success: false, admin: false });
};
