const axios = require("axios");
const functions = require("firebase-functions");
const ipAPIURL = "http://ip-api.io/json/";
const testkey = "82988fc1-7b03-4301-a77a-f41e1aaf228c";
const envVars = functions.config();

const getIpInformation = (ip) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${ipAPIURL}${ip}?api_key=${envVars.ipapi.apikey}`)
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const getIpData = async () => {
  const data = await getIpInformation();
  console.log(data);
};

getIpData();
// const ipInfo = getIpInformation()
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

// console.log(ipInfo);

exports.getIpInformation = getIpInformation;
