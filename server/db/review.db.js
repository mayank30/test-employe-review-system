const { review } = require("../models/model");
const { randomUUID } = require("make-random");
const { master } = require("../config/enum");
const { crypto } = require("../util/util");

module.exports = {
    ADD_REVIEW_BY_EMPLOYEE: AddReview,
    REQUEST_REVIEW: RequestReviewByAdmin,
    UPDATE_REVIEW_STATUS: UpdateReviewStatus,
    GET_ALL_REVIEW_BY_EMPLOYEE: GetAllEmployeeReviews,
    DELETE_REVIEW_REQUEST: DeleteReviewRequest,
};

//#region Insert review
async function AddReview(data, next) {
    let res;
    data.id = await randomUUID();
    data.password = await crypto.hash(data.password);
    await review
        .create(data)
        .then(async(add) => {
            res = add.dataValues;
        })
        .catch((err) => {
            console.log(err.message);
            if (err.name == "SequelizeUniqueConstraintError") {
                res = master.ALREADY_EXIST;
            } else {
                res = master.DATABASE_FAILURE;
            }
        });
    next(res);
}
//#endregion

//#region Request Review By Admin

async function RequestReviewByAdmin(data, next) {
    let res;
    await review
        .update(data, {
            where: {
                id: data.id,
            },
            returning: true,
            raw: true,
        })
        .then(async(add) => {
            res = add[1][0];
        })
        .catch((err) => {
            console.log(err.message);
            if (err.name == "SequelizeUniqueConstraintError") {
                res = master.ALREADY_EXIST;
            } else {
                res = master.DATABASE_FAILURE;
            }
        });
    next(res);
}
//#endregion

//#region Update review Status
async function UpdateReviewStatus(data, next) {
    let res;
    data.id = await randomUUID();
    data.password = await crypto.hash(data.password);
    await review
        .create(data)
        .then(async(add) => {
            res = add.dataValues;
        })
        .catch((err) => {
            console.log(err.message);
            if (err.name == "SequelizeUniqueConstraintError") {
                res = master.ALREADY_EXIST;
            } else {
                res = master.DATABASE_FAILURE;
            }
        });
    next(res);
}
//#endregion

//#region GetAllEmployeeReviews
async function GetAllEmployeeReviews(data, next) {
    let res;
    data.id = await randomUUID();
    data.password = await crypto.hash(data.password);
    await review
        .create(data)
        .then(async(add) => {
            res = add.dataValues;
        })
        .catch((err) => {
            console.log(err.message);
            if (err.name == "SequelizeUniqueConstraintError") {
                res = master.ALREADY_EXIST;
            } else {
                res = master.DATABASE_FAILURE;
            }
        });
    next(res);
}
//#endregion

//#region Delete Review Request
async function DeleteReviewRequest(data, next) {
    let res;
    data.id = await randomUUID();
    data.password = await crypto.hash(data.password);
    await review
        .create(data)
        .then(async(add) => {
            res = add.dataValues;
        })
        .catch((err) => {
            console.log(err.message);
            if (err.name == "SequelizeUniqueConstraintError") {
                res = master.ALREADY_EXIST;
            } else {
                res = master.DATABASE_FAILURE;
            }
        });
    next(res);
}
//#endregion