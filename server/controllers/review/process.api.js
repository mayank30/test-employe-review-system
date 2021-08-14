const { review } = require("../../db/db");
const constants = require("../../config/constants");
const joi = require("@hapi/joi");
const { master } = require("../../config/enum");

module.exports = async function Process(req, res) {
  if (await constants.validateRequest(req, querySchema, res)) {
    await review.PROCESS_REVIEW(req.body, async (e) => {
      let response = { status: false },
        status = 200;
      switch (e) {
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
  id: joi.string().required(),
  status: joi.string().required().valid(constants.APPROVE, constants.REJECTED),
  byEmployee: joi.object().optional(),
});
//#endregion
