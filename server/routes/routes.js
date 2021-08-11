const express = require("express");
const router = express.Router();

const employee = require("./employee.routes");
// const addressee = require("./addressee.routes");

router.use("/employee", employee);
// router.use("/addressee", addressee);

module.exports = router;