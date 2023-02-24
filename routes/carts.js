const express = require("express");
const route = express.Router();

const isAuth = require("../mdw/is-auth");
const cartController = require("../controllers/carts");

//get cart user signin

route.get("/", isAuth, cartController.getCarts);

//post add product to user cart

route.post("/add", isAuth, cartController.addCart);

// update count of product in cart

route.put("/update", isAuth, cartController.updateCart);

//delete product in cart

route.get("/delete", isAuth, cartController.deleteCart);
module.exports = route;
