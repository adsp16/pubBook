const moment = require("moment");

const timeNow = () => {
  return moment().format();
};

const addExpiryTime = (amount, unit) => {
  return moment().add(amount, unit).format();
};

exports.timeNow = timeNow;
exports.addExpiryTime = addExpiryTime;
