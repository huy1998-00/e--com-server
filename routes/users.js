const express = require("express");
const route = express.Router();
const { query } = require("express-validator");
const User = require("../models/user");
const isAuth = require("../mdw/is-auth");

const userController = require("../controllers/users");

// POST user/signup

route.post(
  "/signup",
  [
    query("email", "Invalid Email").isEmail().normalizeEmail(),
    query("password", "Invalid Password").isLength({ min: 5 }),
    query("phone", "Invalid Phone").exists({ checkFalsy: true }),
    query("fullname", "Invalid Phone").exists({ checkFalsy: true }),
  ],

  userController.postSignup
);

// POST user/signin

route.post(
  "/signin",
  query("email", "Invalid Email").isEmail().normalizeEmail(),

  userController.postSignin
);
route.post("/checklogin", userController.checkLoggin);

//GEt userdata
route.get("/:userId", isAuth, userController.getDetailData);

module.exports = route;
