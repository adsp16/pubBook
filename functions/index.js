const functions = require("firebase-functions");
const twilio = require("./services/twillio/twillioConfig");
const cors = require("cors")({ origin: true });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.sendConfirmationSMS = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const { genCode, userPhone } = request.body;
    twilio.sendMessage(userPhone, genCode);
    console.log(request.body);
    response.send("sent");
  });
});
