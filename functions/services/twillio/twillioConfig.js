const twilio = require("twilio");
const functions = require("firebase-functions");
const envVariables = functions.config();
const client = new twilio(
  envVariables.twilio.accountsid,
  envVariables.twilio.authtoken
);

const sendMessage = (phoneNumber, genCode) => {
  client.messages
    .create({
      body: `Your Confirmation Code is ${genCode}`,
      to: `${phoneNumber}`, // Text this number
      from: "+12053786345", // From a valid Twilio number
    })
    .then((result) => {
      console.log(result, " text message sent");
    })
    .catch((err) => console.log(err));
};

const envVars = () => {
  return envVariables;
};

// sendMessage("07591206911", "13455");

exports.sendMessage = sendMessage;
exports.envVars = envVars;
