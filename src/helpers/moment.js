const moment = require("moment");

export const timeNow = () => {
  return moment().format();
};

export const addExpiryTime = (amount, unit) => {
  return moment().add(amount, unit).format();
};
