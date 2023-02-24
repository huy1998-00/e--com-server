const express = require("express");
const router = express.Router();
const isAuth = require("../mdw/is-auth");

const historyController = require("../controllers/histories");

router.get("/", isAuth, historyController.histories);

router.get("/:orderId", isAuth, historyController.detailHistory);

router.post("/dashboard", historyController.dashBoard);

module.exports = router;
