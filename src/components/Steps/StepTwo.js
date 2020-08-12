import React, { useEffect, useState, useRef } from "react";
import { db } from "../../firebase/config";
import { timeNow, addExpiryTime } from "../../helpers/moment";
import { randomCode } from "../../helpers/number";
import { Grid, Button, Typography, Box } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { MailOutline, PhoneIphone, NoEncryption } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import phoneFormat from "phoneformat.js";
import { phoneNumber } from "../../helpers/validation";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "../Steps/StepTwoJSS";
import FormattedPhoneInput from "../Inputs/MobileInputMask";

const StepTwo = React.memo(
  ({
    backStep,
    verificationMethod,
    handleError,
    handleSuccess,
    getExactStep,
    nextStep,
  }) => {
    const classes = useStyles();
    const [formData, setData] = useForm({
      email: "",
      mobileNumber: "",
    });
    const [codeInput, setCodeInput] = useState(null);
    const [confirmationCode, setconfirmationCode] = useState(0);
    const [userEnteredCode, setenteredUserCode] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [confirmLoading, setconfirmLoading] = useState(false);

    const setPhoneUser = () => {
      const randomCodes = randomCode();
      setisLoading(true);
      setconfirmationCode(randomCodes);

      const { mobileNumber } = formData;
      const formatedNum = phoneFormat.formatE164("GB", mobileNumber);
      const payload = { genCode: randomCodes, userPhone: formatedNum };

      if (!formData.mobileNumber) {
        setisLoading(false);
        return handleError("Please enter a valid mobile phone number");
      }

      axios
        .post(
          "https://us-central1-pubbook-2feaf.cloudfunctions.net/sendConfirmationSMS",
          payload
        )
        .then((result) => {
          setCodeInput("sms");
          console.log(result, "code sent");
          handleSuccess("Code has been sent to your phone");
          setisLoading(false);
        })
        .catch((err) => {
          handleError("Could not send code, try again");
          setisLoading(false);
          console.log(err);
        });
    };

    const setEmailUser = () => {
      const randomCodes = randomCode();
      setisLoading(true);
      setconfirmationCode(randomCodes);

      if (!formData.email) {
        setisLoading(false);
        return handleError("Please enter a valid mobile email number");
      }

      const { email } = formData;

      const payLoad = {
        userEmail: email,
        conCode: randomCodes,
      };

      axios
        .post(
          "https://us-central1-pubbook-2feaf.cloudfunctions.net/sendConfirmationEmail",
          payLoad
        )
        .then((result) => {
          setCodeInput("email");
          handleSuccess("Code has been sent to your email");
          setisLoading(false);
        })
        .catch((err) => {
          handleError("Could not send code, please try again");
          setisLoading(false);
          console.log(err);
        });
    };

    const userCode = (event) => {
      setenteredUserCode(event.target.value);
    };

    const confirmEmailCode = () => {
      setconfirmLoading(true);
      const { email } = formData;

      if (userEnteredCode === confirmationCode) {
        const payLoad = {
          email: formData.email,
          mobile: formData.mobileNumber,
          loginAt: timeNow(),
        };

        axios
          .post(
            "https://us-central1-pubbook-2feaf.cloudfunctions.net/addUser",
            payLoad
          )
          .then((result) => {
            setCodeInput("email");
            getExactStep(2);
            setconfirmLoading(false);
            console.log(result, "user added");
          })
          .catch((err) => {
            setconfirmLoading(false);
            handleError("We did something wrong, please try again");
            console.log(err);
          });

        // db.collection("user")
        //   .add({
        //     email: email,
        //     signInTime: timeNow(),
        //   })
        //   .then((result) => {
        //     setCodeInput("email");
        //     getExactStep(2);
        //     console.log(result, "user added");
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     handleError("It was us, something went wrong, try again");
        //   });
      } else {
        setconfirmLoading(false);
        handleError("Confirmation code was not correct, try again");
      }
    };

    const confirmSMSCode = () => {
      const { mobileNumber } = formData;
      const formatedNum = phoneFormat.formatE164("GB", mobileNumber);
      setconfirmLoading(true);

      if (userEnteredCode === confirmationCode) {
        const payLoad = {
          email: formData.email,
          mobile: formData.mobileNumber,
          loginAt: timeNow(),
        };

        axios
          .post(
            "https://us-central1-pubbook-2feaf.cloudfunctions.net/addUser",
            payLoad
          )
          .then((result) => {
            setCodeInput("sms");
            setconfirmLoading(false);
            getExactStep(2);
            console.log(result, "user added");
          })
          .catch((err) => {
            console.log(err);
            handleError("We did something wrong, please try again");
            console.log(err);
          });
      } else {
        setconfirmLoading(false);
        return handleError("Codes did not match, try again");
      }
    };

    const addUser = () => {
      console.log(!formData.email);
      console.log(!formData.mobileNumber);
      setisLoading(true);

      if (!formData.email && !formData.mobileNumber) {
        setisLoading(false);
        handleError("Please enter a username or password");
        return;
      }

      const payLoad = {
        email: formData.email,
        mobile: formData.mobileNumber,
        loginAt: timeNow(),
      };

      axios
        .post(
          "https://us-central1-pubbook-2feaf.cloudfunctions.net/addUser",
          payLoad
        )
        .then((result) => {
          setisLoading(false);
          getExactStep(2);
          console.log(result);
        })
        .catch((err) => console.log(err));
    };

    const getInputType = () => {
      const { mobileNumber } = formData;
      console.log(mobileNumber);
      console.log(verificationMethod);
      switch (verificationMethod) {
        case "sms":
          return (
            <FormattedPhoneInput
              setData={setData}
              value={formData.mobileNumber}
            />
          );
        case "email":
          return (
            <TextField
              label="Email"
              id="email"
              variant="outlined"
              fullWidth={true}
              onChange={setData}
              value={formData.email}
            />
          );
        case "noconfirm":
          return (
            <React.Fragment>
              <Box mb={2}>
                <TextField
                  label="Email"
                  id="email"
                  variant="outlined"
                  fullWidth={true}
                  onChange={setData}
                  value={formData.email}
                />
              </Box>
              <FormattedPhoneInput
                setData={setData}
                value={formData.mobileNumber}
              />
            </React.Fragment>
          );
        case null:
          return null;
      }
    };

    const setGetCode = () => {
      switch (verificationMethod) {
        case "sms":
          return isLoading ? (
            <CircularProgress size={30} />
          ) : (
            <Button
              color="primary"
              fullWidth={true}
              variant="contained"
              onClick={setPhoneUser}
            >
              Get Code
            </Button>
          );
        case "email":
          return isLoading ? (
            <CircularProgress size={30} />
          ) : (
            <Button
              color="primary"
              fullWidth={true}
              variant="contained"
              onClick={setEmailUser}
            >
              Get Code
            </Button>
          );
        case "noconfirm":
          return isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              color="primary"
              fullWidth={true}
              variant="contained"
              onClick={addUser}
            >
              Add User
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
            <React.Fragment>
              <Grid item xs={6}>
                <Box mt={2}>
                  <TextField
                    size={"small"}
                    variant="outlined"
                    onChange={userCode}
                  ></TextField>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box mt={2}>
                  {confirmLoading ? (
                    <CircularProgress size={30} />
                  ) : (
                    <Button
                      onClick={confirmSMSCode}
                      fullWidth={true}
                      variant="contained"
                      color="primary"
                    >
                      Confirm Code
                    </Button>
                  )}
                </Box>
              </Grid>
            </React.Fragment>
          );
        case "email":
          return (
            <React.Fragment>
              <Grid item xs={6}>
                <Box mt={2}>
                  <TextField
                    size={"small"}
                    variant="outlined"
                    onChange={userCode}
                  ></TextField>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box mt={2}>
                  {confirmLoading ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      onClick={confirmEmailCode}
                      fullWidth={true}
                      variant="contained"
                      color="primary"
                    >
                      Confirm Code
                    </Button>
                  )}
                </Box>
              </Grid>
            </React.Fragment>
          );
        case "noconfirm":
          return null;
        case null:
          return null;
        default:
          return <h1> Not Good</h1>;
      }
    };

    const getIcons = () => {
      console.log(verificationMethod);

      switch (verificationMethod) {
        case "sms":
          return <PhoneIphone className={classes.icon} />;
        case "email":
          return (
            <MailOutline
              style={{ marginRight: "1rem" }}
              className={classes.icon}
            />
          );
        case "noconfirm":
          return <NoEncryption className={classes.icon} />;
        default:
          return "Should not get here";
      }
    };

    return (
      <Grid container spacing={2}>
        <Grid container item alignItems="center">
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" my={2}>
              {getIcons()}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box my={2}>{getInputType()}</Box>
          </Grid>
          <Grid item xs={12}>
            <Box my={2}>{setGetCode()}</Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container item>
              {setConfirmCode()}
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12} justify="space-between">
          <Box onClick={backStep} variant="contained">
            <ArrowBack />
          </Box>
          <Box onClick={nextStep}>
            <ArrowForward />
          </Box>
        </Grid>
      </Grid>
    );
  }
);

export default StepTwo;
