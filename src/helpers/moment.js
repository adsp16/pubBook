const moment = require("moment");

export const timeNow = () => {
  const now = new Date();
  const timeStamp = now.getTime();
  console.log(timeStamp);
  return timeStamp;
};

// const addExpiryTime = (amount, unit) => {
//   return moment().add(amount, unit).format();
// };

export const convTimestamp = (num) => {
  return moment.unix(num);
};

export const getTimeStamp = (date) => {
  return moment(date).unix();
};
