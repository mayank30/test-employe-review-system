const messageCodes = require("./messageCode");

require("dotenv").config();
const TOKEN_HEADER_KEY = "x-token";
const USER_ROLES = {
    ADMIN: "ADMIN",
    EMPLOYEE: "EMPLOYEE",
};
const status = {
    AGREE: "AGREE",
    PENDING: "PENDING",
    REJECTED: "REJECTED",
    ACTIVE: "ACTIVE",
};

const devConfig = {
    JWT_SECRET: process.env.JWT_SECRET_DEV,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET_DEV,
    TOKEN_EXPIRE_IN: process.env.TOKEN_EXPIRE_IN,
    ACCOUNT_TOKEN_EXPIRE_IN: process.env.ACCOUNT_TOKEN_EXPIRE_IN,
    REFRESH_TOKEN_EXPIRE_IN: process.env.REFRESH_TOKEN_EXPIRE_IN,
};

const testConfig = {
    JWT_SECRET: process.env.JWT_SECRET_TEST,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET_TEST,
    TOKEN_EXPIRE_IN: process.env.TOKEN_EXPIRE_IN,
    ACCOUNT_TOKEN_EXPIRE_IN: process.env.ACCOUNT_TOKEN_EXPIRE_IN,
    REFRESH_TOKEN_EXPIRE_IN: process.env.REFRESH_TOKEN_EXPIRE_IN,
};

const prodConfig = {
    JWT_SECRET: process.env.JWT_SECRET_PROD,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET_PROD,
    ACCOUNT_TOKEN_EXPIRE_IN: process.env.ACCOUNT_TOKEN_EXPIRE_IN,
    REFRESH_TOKEN_EXPIRE_IN: process.env.REFRESH_TOKEN_EXPIRE_IN,
};

const defaultConfig = {
    URL: "http://" +
        (process.env.APP_URL || "localhost") +
        ":" +
        (process.env.PORT || 3000) +
        "/",
    PORT: process.env.PORT || 3000,
    APP_URL: process.env.APP_URL || "localhost",
    APP_KEY: process.env.APP_KEY,
};

function envConfig(env) {
    switch (env) {
        case "development":
            return devConfig;
        case "test":
            return testConfig;
        default:
            return prodConfig;
    }
}

module.exports = {
    ...defaultConfig,
    ...status,
    ...envConfig(process.env.NODE_ENV),
    ENV: process.env.NODE_ENV || "development",
    ...USER_ROLES,
    ...messageCodes,
    TOKEN_HEADER_KEY,
    appName: "PayPay",
};