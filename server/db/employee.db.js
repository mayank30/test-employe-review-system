const { employee } = require("../models/model");
const constants = require("../config/constants");
const { randomUUID, randomInRange } = require("make-random");
const { crypto, token, mask, sms } = require("../util/util");
const { master } = require("../config/enum");

module.exports = {
    LOGIN: Login,
    REGISTER: AddEmployee,
    UPDATE: UpdateEmployee,
    DELETE: DeleteEmployee,
    GETALL: GetAllEmployees,
};

//#region employee Login
async function Login(data, next) {
    let res;
    await employee
        .findOne({
            where: {
                email: data.email,
            },
            raw: true,
        })
        .then(async(acc) => {
            if (acc == null) {
                res = master.NO_DATA_FOUND;
            } else {
                if (acc.status === constants.ACTIVE) {
                    const verifyHash = acc.password;
                    if (await crypto.verify(data.password, verifyHash)) {
                        res = Object.assign({}, acc);
                        delete res.password;
                        res.token = await token.GENERATE(
                            res,
                            constants.ACCOUNT_TOKEN_EXPIRE_IN.toString()
                        );
                    } else {
                        res = master.PASSWORD_MISMATCH;
                    }
                } else {
                    res = master.ACCOUNT_DISABLED;
                }
            }
        })
        .catch((err) => {
            console.log(err.message);
            res = master.DATABASE_FAILURE;
        });
    next(res);
}
//#endregion

//#region Add employee
async function AddEmployee(data, next) {
    let res;
    data.id = await randomUUID();
    data.status = constants.ACTIVE;
    data.password = await crypto.hash(data.password);
    await employee
        .create(data)
        .then(async(acc) => {
            res = acc.dataValues;
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

//#region Get All employees
async function GetAllEmployees(data, next) {
    let res;
    await employee
        .findAndCountAll({
            raw: true,
            limit: data.limit,
            offset: data.offset,
        })
        .then(async(acc) => {
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

//#region Update employee
async function UpdateEmployee(data, next) {
    let res;
    await employee
        .findOne({
            where: {
                id: data.employeeId,
            },
            raw: true,
        })
        .then(async(acc) => {
            if (acc == null) {
                res = master.NO_DATA_FOUND;
            } else {
                await employee
                    .update(acc, {
                        where: {
                            id: data.employeeId,
                        },
                        returning: true,
                        raw: true,
                    })
                    .then(async(a) => {
                        res = a[1][0];
                    })
                    .catch((err) => {
                        res = master.DATABASE_FAILURE;
                    });
            }
        })
        .catch((err) => {
            console.log(err.message);
            res = master.DATABASE_FAILURE;
        });
    next(res);
}
//#endregion

//#region Delete employee
async function DeleteEmployee(data, next) {
    let res;
    await employee
        .destroy({
            where: {
                id: data.employeeId,
            },
            returning: true,
            raw: true,
        })
        .then(async(emp) => {
            res = emp;
            if (res == 0) {
                res = master.NO_DATA_FOUND;
            }
        })
        .catch((err) => {
            res = master.NO_DATA_FOUND;
        });
    next(res);
}
//#endregion