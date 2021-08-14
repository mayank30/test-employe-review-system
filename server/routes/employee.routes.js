const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorize");
const constants = require("../config/constants");

const Login = require("../controllers/employee/login.api");
router.post("/login", Login);

const GetALL = require("../controllers/employee/getAll.api");
router.post("/", authorize(constants.ADMIN), GetALL);

const Register = require("../controllers/employee/register.api");
router.post("/register", authorize(constants.ADMIN), Register);

const Update = require("../controllers/employee/update.api");
router.post("/update", authorize([constants.ADMIN]), Update);

const Delete = require("../controllers/employee/delete.api");
router.post("/delete", authorize(constants.ADMIN), Delete);

module.exports = router;
