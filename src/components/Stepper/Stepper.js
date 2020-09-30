import React, { useState, useEffect } from "react";
import {
  Stepper,
  Grid,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
} from "@material-ui/core";

import ErrorAlert from "../Alerts/ErrorAlert";
import SuccessAlert from "../Alerts/SuccessAlert";

import StepOne from "../Steps/StepOne";
import StepTwo from "../Steps/StepTwo";
import StepThree from "../Steps/StepThree";

import { useStyles } from "./StepperJSS";

const getSteps = () => {
  return ["Method", "Details", "Verified"];
};

const VerifiationStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [vMethod, setVMethod] = useState("");
  const steps = getSteps();
  const [errorMessage, seterrorMessage] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  const [snackOpen, setsnackOpen] = useState(false);
  const [successSnackOpen, setsuccessSnackOpen] = useState(false);

  const classes = useStyles();

  const getStepContent = (currentStep) => {
    switch (currentStep) {
      case 0:
        return (
          <StepOne
            setVerifiMethod={setVerificationMethod}
            nextStep={handleNextStep}
          />
        );
      case 1:
        return (
          <StepTwo
            verificationMethod={vMethod}
            backStep={handleBackStep}
            nextStep={handleNextStep}
            handleError={handleError}
            getExactStep={getExactStep}
            handleSuccess={handleSuccess}
          />
        );
      case 2:
        return (
          <StepThree backStep={handleBackStep} getExactStep={getExactStep} />
        );
      default:
        return new Error("Should not make it here");
    }
  };

  const handleNextStep = () => {
    setCurrentStep((p) => p + 1);
  };

  const handleBackStep = () => {
    setCurrentStep((p) => p - 1);
  };

  const setVerificationMethod = (id) => {
    setVMethod(id);
  };

  const handleError = (errorMessage) => {
    setsnackOpen(true);
    seterrorMessage(errorMessage);
  };

  const handleSuccess = (successMessage) => {
    setsuccessSnackOpen(true);
    setsuccessMessage(successMessage);
  };

  const getExactStep = (step) => {
    setCurrentStep(step);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" alignItem="center">
          <img src={process.env.PUBLIC_URL + "/200x200.png"}></img>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Stepper className={classes.root} activeStep={currentStep}>
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {getStepContent(currentStep)}
        <Box marginTop={2} display="flex" justifyContent="space-between"></Box>
        <ErrorAlert
          setOpen={setsnackOpen}
          open={snackOpen}
          errorMessage={errorMessage}
        />
        <SuccessAlert
          successMessage={successMessage}
          open={successSnackOpen}
          setOpen={setsuccessSnackOpen}
        />
      </Grid>
    </Grid>
  );
};

export default VerifiationStepper;
