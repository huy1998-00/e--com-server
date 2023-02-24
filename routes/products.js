const express = require("express");
const { query } = require("express-validator");
const route = express.Router();

const productController = require("../controllers/products");

//get /products
route.get("/", productController.getProducts);

//get /product by id
route.get("/:id", productController.getProductById);

//get pagination product
route.post("/pagination", productController.ProductPagination);

// add product
route.post("/addproduct", productController.addproduct);

// add product
route.post("/editproduct", productController.updateProduct);

// delete
route.delete("/delete/:productId", productController.deleteProduct);
module.exports = route;
