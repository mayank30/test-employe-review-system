const { review } = require("../../db/db");
const constants = require("../../config/constants");
const joi = require("@hapi/joi");
const { master } = require("../../config/enum");

module.exports = async function Request(req, res) {
  if (await constants.validateRequest(req, querySchema, res)) {
    await review.REQUEST_REVIEW(req.body, async (e) => {
      let response = { status: false },
        status = 200;
      switch (e) {
        case master.ALREADY_EXIST: {
          response = {
            error: "Review request already exist",
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
  reviewById: joi.string().required(),
  reviewFor: joi.object().required(),
  byEmployee: joi.object().optional(),
});
//#endregion
