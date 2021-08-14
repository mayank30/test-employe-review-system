const master = {
  DATABASE_FAILURE: 0,
  ALREADY_EXIST: 1,
  NO_DATA_FOUND: 2,
  PASSWORD_MISMATCH: 3,
  OTP_MISMATCH: 4,
  SMS_FAILURE: 5,
  OTP_SENT: 6,
  ACCOUNT_DISABLED: 7,
  SUCCESS: -1,
  NOT_ALLOWED: 8,
};

module.exports = {
  master,
};
