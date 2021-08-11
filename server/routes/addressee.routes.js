const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorize");
const constants = require("../config/constants");

// const AddAddressee = require("../controllers/addressee/addAddressee.api");
// router.post("/add", authorize(constants.ADMIN), AddAddressee);

// const GetAllAddressees = require("../controllers/addressee/getAllAddressees.api");
// router.post("/", authorize(constants.ADMIN), GetAllAddressees);

// const UpdateAddressee = require("../controllers/addressee/updateAddressee.api");
// router.post("/update", authorize(constants.ADMIN), UpdateAddressee);

// const BulkInsertAddressees = require("../controllers/addressee/bulkInsertAddressees.api");
// router.post("/bulk", authorize(constants.ADMIN), BulkInsertAddressees);

module.exports = router;