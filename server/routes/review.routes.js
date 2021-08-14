const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorize");
const constants = require("../config/constants");

const GetAllByEmployeeId = require("../controllers/review/getAllByEmpId.api");
router.post(
  "/getByEmpId",
  authorize([constants.ADMIN, constants.EMPLOYEE]),
  GetAllByEmployeeId
);

const Request = require("../controllers/review/request.api");
router.post("/request", authorize(constants.ADMIN), Request);

const Submit = require("../controllers/review/submit.api");
router.post("/submit", authorize(constants.EMPLOYEE), Submit);

const Process = require("../controllers/review/process.api");
router.post("/process", authorize([constants.ADMIN]), Process);

const Delete = require("../controllers/review/delete.api");
router.post("/delete", authorize(constants.ADMIN), Delete);

module.exports = router;
