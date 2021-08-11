const constant = require("../config/constants");

module.exports = {
    errorHandler: function(req, res, next) {
        const error = new Error(constant.DATA_NOT_FOUND);
        error.status = 200; // It was force set up
        next(error);
    },
    errorHandlerAll: function(error, req, res, next) {
        constant.response({
                code: error.message,
                status: error.status || 500,
                error: constant.INVALID_REQUEST,
            },
            res
        );
        next();
    }
};