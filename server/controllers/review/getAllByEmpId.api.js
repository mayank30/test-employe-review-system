const { review } = require("../../db/db");
const constants = require("../../config/constants");
const joi = require("@hapi/joi");
const { master } = require("../../config/enum");

module.exports = async function GetAllReviewRequestByEmpID(req, res) {
  if (await constants.validateRequest(req, querySchema, res)) {
    await review.GET_ALL_REVIEW_BY_EMPLOYEE(req.body, async (e) => {
      let response = { status: false },
        status = 200;
      switch (e) {
        case master.NO_DATA_FOUND: {
          response = {
            error: "No Record found",
            code: "ERROR",
            status: false,
          };
          break;
        }
        case master.DATABASE_FAILURE: {
          response = {
            error: "Something went wrong",
            code: "ERROR",
            status: false,
          };
          break;
        }
        default: {
          status = 200;
          response = {
            status: true,
            data: e,
            code: "SUCCESS",
            status: true,
          };
          break;
        }
      }
      res.status(status).json(response);
    });
  }
};

//#region JOI Validation
const querySchema = joi.object({
  limit: joi.string().required(),
  offset: joi.string().required(),
  id: joi.string().optional(),
  byEmployee: joi.object().required(),
});
//#endregion
