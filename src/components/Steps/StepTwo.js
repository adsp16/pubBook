import React, { useEffect, useState, useRef } from "react";
import { db } from "../../firebase/config";
import { timeNow, addExpiryTime } from "../../helpers/moment";
import { Grid, Button, Typography, Box } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { MailOutline, PhoneIphone } from "@material-ui/icons/";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import Cleave from "cleave.js";
import "cleave.js/dist/addons/cleave-phone.gb";
import phoneFormat from "phoneformat.js";
import { phoneNumber } from "../../helpers/validation";
import { useStyles } from "../Steps/StepTwoJSS";

const StepTwo = React.memo(({ backStep, verificationMethod }) => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [formData, setData] = useForm({ mobileNumber: "", email: "" });
  const [codeInput, setCodeInput] = useState(null);
  const [confirmationCode, setconfirmationCode] = useState(0);
  const [userEnteredCode, setenteredUserCode] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const mobileInput = useRef();

  useEffect(() => {
    // console.log("useEffect Ran");
    // const mobInp = document.getElementById("mobileNumber");
    // console.log(mobInp);
    // new Cleave(mobInp, {
    //   phone: true,
    //   phoneRegionCode: "GB",
    // });

    console.log(typeof verificationMethod);

    console.log(error);
  }, [error, backStep]);

  const setPhoneUser = () => {
    const randomCode = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);

    setisLoading(true);
    setCodeInput("sms");
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

  const setEmailUser = () => {
    console.log("set email user");
  };

  const userCode = (event) => {
    setenteredUserCode(event.target.value);
  };

  const confirmEmailCode = () => {
    console.log("email code confirmed");
  };

  const confirmSMSCode = () => {
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
          setCodeInput("sms");
          console.log(result, "user added");
        })
        .catch((err) => console.log(err));
    } else {
      setError("Codes Did Not Match");
    }
  };

  const getInputType = () => {
    return verificationMethod === "sms" ? (
      <TextField
        ref={mobileInput}
        label="Mobile"
        id="mobileNumber"
        variant="outlined"
        fullWidth={true}
        onChange={setData}
        value={formData.mobileNumber}
      />
    ) : (
      <TextField label="Email" id="email" variant="outlined" fullWidth={true} />
    );
  };

  const setGetCode = () => {
    switch (verificationMethod) {
      case "sms":
        return (
          <Button fullWidth={true} variant="contained" onClick={setPhoneUser}>
            Get Code
          </Button>
        );
      case "email":
        return (
          <Button fullWidth={true} variant="contained" onClick={setEmailUser}>
            Get Code
          </Button>
        );
      default:
        return <h1> Not Good</h1>;
    }
  };

  const setConfirmCode = () => {
    switch (codeInput) {
      case "sms":
        return (
          <Grid container item>
            <Grid item xs={6}>
              <TextField variant="outlined" onChange={userCode}></TextField>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={confirmSMSCode}
                fullWidth={true}
                variant="contained"
              >
                Confirm Code
              </Button>
            </Grid>
          </Grid>
        );
      case "email":
        return (
          <Grid container item>
            <Grid item xs={6}>
              <TextField variant="outlined" onChange={userCode}></TextField>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={confirmEmailCode}
                fullWidth={true}
                variant="contained"
              >
                Confirm Code
              </Button>
            </Grid>
          </Grid>
        );
      case null:
        return null;
      default:
        return <h1> Not Good</h1>;
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid container item alignItems="center">
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="center"
            className={classes.spacing}
          >
            {verificationMethod === "sms" ? (
              <PhoneIphone />
            ) : (
              <MailOutline
                style={{ marginRight: "1rem" }}
                className={classes.largeIcon}
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          {getInputType()}
        </Grid>
        <Grid item xs={12}>
          <Box mt={2}>{setGetCode()}</Box>
        </Grid>
        {setConfirmCode()}
      </Grid>
      <Grid container item xs={12} justify="space-between">
        <Box onClick={backStep} variant="contained">
          <ArrowBack />
        </Box>
        <Box>
          <ArrowForward />
        </Box>
      </Grid>
    </Grid>
  );
});

export default StepTwo;
