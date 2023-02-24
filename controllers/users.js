const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//handle signup
exports.postSignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();

    next(error);
  }

  const email = req.query.email;
  const password = req.query.password;
  const fullname = req.query.fullname;
  const phone = req.query.phone;

  try {
    const existsUser = await User.findOne({ email: email });

    if (existsUser) {
      const err = new Error("Email exists");
      err.statusCode = 422;
      throw err;
    } else {
      const hashedPw = await bcrypt.hash(password, 12);
      const user = new User({
        email: email,
        password: hashedPw,
        fullname: fullname,
        phone: phone,
      });

      const result = await user.save();

      res.status(200).json({ message: "User created ", data: result });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
//handle signup
exports.postSignin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();

    next(error);
  }
  try {
    const email = req.query.email;
    const password = req.query.password;

    const existsUser = await User.findOne({ email: email });
    if (!existsUser) {
      const err = new Error("Email not exists");
      err.statusCode = 422;
      throw err;
    }
    const correctPw = await bcrypt.compare(password, existsUser.password);
    if (!correctPw) {
      const err = new Error("Wrong Password");
      err.statusCode = 422;
      throw err;
    }
    const token = jwt.sign(
      { email: email, role: existsUser.role },
      "supersecrectpassword"
    );

    return res.status(200).json({
      message: "Login success",
      token: token,
      userId: existsUser._id.toString(),
      role: existsUser.role,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
// lay data cua userlogin
exports.getDetailData = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);

    res.status(200).json({ fullname: user.fullname, user: user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
// checkloggin

exports.checkLoggin = async (req, res, next) => {
  const userID = req.body.userID;

  if (!userID) {
    return res.status(200).json({ status: false });
  } else {
    const userLoggin = await User.findById(userID);

    if (!userLoggin) {
      return res.status(200).json({ status: false, user: undefined });
    } else {
      return res.status(200).json({ status: true, user: userLoggin });
    }
  }
};
