const express = require("express");
const route = express.Router();

const isAuth = require("../mdw/is-auth");

const checkoutController = require("../controllers/checkout");

route.post("/", checkoutController.checkout);

module.exports = route;
