const express = require("express");
const router = express.Router();

const employee = require("./employee.routes");
const review = require("./review.routes");

router.use("/employee", employee);
router.use("/review", review);

module.exports = router;
