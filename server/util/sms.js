const rest = require("./rest");
const constant = require("../config/constants");
const MSG_91 = "https://api.msg91.com/api/v5/otp";
const AUTH_KEY = "?authkey=" + constant.MSG_91_AUTH_KEY;
const OTP_TEMPLATE_ID = "&template_id=5f08b6cfd6fc05727575e34a";
const MOBILE_KEY = "&mobile=+91";
const OTP_KEY = "&otp=";
const API = {
    SEND_OTP: MSG_91 + AUTH_KEY + OTP_TEMPLATE_ID + "&invisible=1" + MOBILE_KEY,
    RESEND_OTP: MSG_91 + "/retry" + AUTH_KEY + MOBILE_KEY,
    VERIFY_OTP: MSG_91 + "/verify" + AUTH_KEY + MOBILE_KEY,
};

module.exports = {
    async GetAPI(api, next) {
        await rest.call(api, "GET", "", "", (response) => {
            next(response.data);
        });
    },
    sendOTP(mobile, otp, next) {
        const api = API.SEND_OTP + mobile + OTP_KEY + otp;
        this.GetAPI(api, (r) => {
            next(r);
        });
    },
    reSendOTP(mobile, next) {
        const api = API.RESEND_OTP + mobile;
        this.GetAPI(api, (r) => {
            next(r);
        });
    },
    verifyOTP(mobile, otp, next) {
        const api = API.VERIFY_OTP + mobile + OTP_KEY + otp;
        this.GetAPI(api, (r) => {
            next(r);
        });
    },
};