const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const twilio = require("./services/twillio/twillioConfig");
const sendGrid = require("./services/sendGrid/sendGridConfig");
const ipApi = require("./services/ipAPI/Ip-API");
const moment = require("./services/moment/time");

const cors = require("cors")({ origin: true });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello Form the place");
  });
});

exports.sendConfirmationSMS = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const { genCode, userPhone } = request.body;
    twilio.sendMessage(userPhone, genCode);
    response.send("sms sent");
  });
});

exports.sendConfirmationEmail = functions.https.onRequest(
  (request, response) => {
    cors(request, response, () => {
      const { userEmail, conCode } = request.body;

      sendGrid
        .sendEmailCode(userEmail, conCode)
        .then((result) => {
          response.send("Code Sent");
        })
        .catch((err) => {
          console.log(err);
          response.send("Code Not Sent");
        });
    });
  }
);

exports.addUser = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const { email, mobile } = request.body;
    const apiadd = request.ip;
    let locationInfo = await ipApi.getIpInformation(apiadd);

    if (!locationInfo) {
      locationInfo = "Could not get location";
    }

    const currentTimestamp = admin.firestore.Timestamp.now();
    console.log(currentTimestamp);

    const newUser = {
      email: email,
      mobile: mobile,
      loginAt: currentTimestamp,
      location: locationInfo,
    };

    admin
      .firestore()
      .collection("user")
      .add(newUser)
      .then((result) => {
        console.log("added in here");

        response.send("Got here user added");
      })
      .catch((err) => {
        console.log(err);
        response.send("Could not add user try again");
      });
  });
});

exports.getlastLogins = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    admin
      .firestore()
      .collection("user")
      .orderBy("loginAt", "desc")
      .limit(20)
      .get()
      .then((snapShot) => {
        response.send(snapShot.docs);
      })
      .catch((err) => response.send(err));
  });
});
