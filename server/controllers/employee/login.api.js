const { employee } = require("../../db/db");
const constants = require("../../config/constants");
const joi = require("@hapi/joi");
const { master } = require("../../config/enum");

module.exports = async function login(req, res) {
    if (await constants.validateRequest(req, querySchema, res)) {
        await employee.LOGIN(req.body, async(e) => {
            let response = { status: false },
                status = 200;
            switch (e) {
                case master.NO_DATA_FOUND:
                    {
                        response = {
                            error: "Invalid Login",
                            code: "ERROR",
                            status: false,
                        };
                        break;
                    }
                case master.PASSWORD_MISMATCH:
                    {
                        response = {
                            error: "Invalid Login",
                            code: "ERROR",
                            status: false,
                        };
                        break;
                    }
                case master.ACCOUNT_DISABLED:
                    {
                        response = {
                            error: "Account is inactive",
                            code: "ERROR",
                            status: false,
                        };
                        break;
                    }
                case master.DATABASE_FAILURE:
                    {
                        response = {
                            error: "Something went wrong",
                            code: "ERROR",
                            status: false,
                        };
                        break;
                    }
                default:
                    {
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
    email: joi.string().required(),
    password: joi.string().required(),
});
//#endregion