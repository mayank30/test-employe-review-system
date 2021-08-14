const { review } = require("../models/model");
const { randomUUID } = require("make-random");
const { master } = require("../config/enum");
const constants = require("../config/constants");

module.exports = {
  REQUEST_REVIEW: RequestReviewByAdmin,
  SUBMIT_REVIEW: SubmitReview,
  PROCESS_REVIEW: ProcessReview,
  GET_ALL_REVIEW_BY_EMPLOYEE: GetAllReviewRequestByEmpID,
  DELETE_REVIEW_REQUEST: DeleteReviewRequest,
};

//#region Request Review By Admin
async function RequestReviewByAdmin(data, next) {
  let res;
  await review
    .findOne({
      where: {
        reviewById: data.reviewById,
        reviewFor: {
          id: data.reviewFor.id,
        },
        period: constants.currentPeriod,
      },
      raw: true,
    })
    .then(async (r) => {
      if (r == null) {
        data.id = await randomUUID();
        if (data.period == undefined) {
          data.period = constants.currentPeriod;
        }
        data.status = constants.PENDING;
        await review
          .create(data)
          .then(async (add) => {
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
      } else {
        res = master.ALREADY_EXIST;
      }
    })
    .catch((err) => {
      console.log(err.message);
      res = master.DATABASE_FAILURE;
    });
  next(res);
}
//#endregion

//#region Submit review Status
async function SubmitReview(data, next) {
  let res;
  await review
    .findOne({
      where: {
        reviewById: data.byEmployee.id,
        id: data.id,
      },
      raw: true,
    })
    .then(async (r) => {
      if (r != null) {
        if (r.status != constants.PENDING) {
          res = master.NOT_ALLOWED;
        } else {
          data.status = constants.SUBMITTED;
          await review
            .update(data, {
              where: {
                id: data.id,
              },
              returning: true,
              raw: true,
            })
            .then(async (a) => {
              res = a[1][0];
            })
            .catch((err) => {
              res = master.DATABASE_FAILURE;
            });
        }
      } else {
        res = master.UNAUTHORIZE;
      }
    });
  next(res);
}
//#endregion

//#region Process review Status
async function ProcessReview(data, next) {
  let res;
  await review
    .update(
      {
        status: data.status,
      },
      {
        where: {
          id: data.id,
        },
        returning: true,
        raw: true,
      }
    )
    .then(async (a) => {
      res = a[1][0];
    })
    .catch((err) => {
      res = master.DATABASE_FAILURE;
    });
  next(res);
}
//#endregion

//#region GetAllEmployeeReviews
async function GetAllReviewRequestByEmpID(data, next) {
  let res;
  if (data.id !== undefined) {
    data.byEmployee.id = data.id;
  }
  await review
    .findAndCountAll({
      raw: true,
      reviewById: data.byEmployee.id,
      limit: data.limit,
      offset: data.offset,
    })
    .then(async (acc) => {
      if (acc.rows.length == 0) {
        res = master.NO_DATA_FOUND;
      } else {
        res = acc;
      }
    })
    .catch((err) => {
      res = master.DATABASE_FAILURE;
    });
  next(res);
}
//#endregion

//#region Delete Review Request
async function DeleteReviewRequest(data, next) {
  let res;
  await review
    .destroy({
      where: {
        id: data.id,
      },
      returning: true,
      raw: true,
    })
    .then(async (emp) => {
      res = emp;
      if (res == 0) {
        res = master.NO_DATA_FOUND;
      }
    })
    .catch((err) => {
      res = master.DATABASE_FAILURE;
    });
  next(res);
}
//#endregion
