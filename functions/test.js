const twilioFunc = require("./services/twillio/twillioConfig");

console.log("ran the file");
twilioFunc.sendMessage("+447591206911", "13455");

// const setGetCode = () => {
//   switch(verificationMethod) {
//     case "sms":
//       return (
//         <Button fullWidth={true} variant="contained" onClick={setPhoneUser}>
//           Get Code
//         </Button>
//       );
//     case "email ":
//       return (
//         <Button fullWidth={true} variant="contained" onClick={setPhoneUser}>
//           Get Code
//         </Button>
//       );
//     default:
//       return <Button variant="contained">Fuck You</Button>;
//   }
// };

const confirmCode = () => {
  console.log(addExpiryTime(5, "m"));
  const { mobileNumber } = formData;
  const formatedNum = phoneFormat.formatE164("GB", mobileNumber);
  console.log(formatedNum);

  if (userEnteredCode === confirmationCode) {
    db.collection("user")
      .add({
        mobile: formatedNum,
        signInTime: timeNow(),
      })
      .then((result) => {
        setCodeInput(true);
        nextStep();
        console.log(result, "user added");
      })
      .catch((err) => console.log(err));
  } else {
    setError("Codes Did Not Match");
  }
};

const setPhoneUser = () => {
  const randomCode = (Math.floor(Math.random() * 10000) + 10000)
    .toString()
    .substring(1);

  setisLoading(true);
  setCodeInput(true);
  setconfirmationCode(randomCode);

  const { mobileNumber } = formData;
  const formatedNum = phoneFormat.formatE164("GB", mobileNumber);
  const payload = { genCode: randomCode, userPhone: formatedNum };

  console.log(payload);
  console.log(formatedNum);

  // axios
  //   .post(
  //     "https://us-central1-pubbook-2feaf.cloudfunctions.net/sendConfirmationSMS",
  //     payload
  //   )
  //   .then((result) => {
  //     console.log(result, "code sent");
  //   })
  //   .catch((err) => console.log(err));

  //   db.collection("user")
  //     .add({
  //       mobile: formatedNum,
  //       signInTime: timeNow(),
  //       codeExpiryTime: addExpiryTime(5, "m"),
  //       confirmationCode: randomCode,
  //     })
  //     .then((result) => {
  //       setCodeInput(true);
  //       setconfirmationCode(randomCode);
  //       console.log(result, "user added");
  //     })
  //     .catch((err) => console.log(err));
};
