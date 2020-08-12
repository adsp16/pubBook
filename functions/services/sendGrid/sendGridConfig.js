const functions = require("firebase-functions");
const client = require("@sendgrid/client");
const { sendConfirmationEmail } = require("../..");
const envVars = functions.config();
const sendGridUrl = "https://api.sendgrid.com/v3";
client.setApiKey(envVars.sendgrid.apikey);

const sendEmailCode = (toEmail, confirmationCode) => {
  return new Promise((resolve, reject) => {
    const request = {
      method: "POST",
      url: `${sendGridUrl}/mail/send`,
      body: {
        personalizations: [
          {
            to: [
              {
                email: `${toEmail}`,
              },
            ],
            dynamic_template_data: {
              verb: "",
              email: `${toEmail}`,
              adjective: "",
              noun: "",
              currentDayofWeek: "",
              confirmation_code: `${confirmationCode}`,
            },
          },
        ],
        from: {
          email: "noreply@adamp.com",
          name: "PubBook",
        },
        reply_to: {
          email: "noreply@adamp.com",
          name: "PubBook",
        },
        template_id: "d-a446367ba7ab4793a814f357a562ca1e",
      },
    };

    client
      .request(request)
      .then(([response, body]) => {
        console.log(response);
        console.log("email sent");
        return resolve("email sent");
      })
      .catch((err) => {
        console.log(err);
        return reject(err);
      });
  });
};

exports.sendEmailCode = sendEmailCode;
