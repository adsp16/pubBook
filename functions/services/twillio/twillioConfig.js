const twilio = require("twilio");
const accountSid = "ACc5efcac8bc38bc0fe96671de0b11b724";
const authToken = "65f77e5d58b53fa0c93f02880613fb9b";
const client = new twilio(accountSid, authToken);

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

// sendMessage("07591206911", "13455");

exports.sendMessage = sendMessage;
