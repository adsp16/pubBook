import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
} from "@material-ui/core";

import StepOne from "../Steps/StepOne";
import StepTwo from "../Steps/StepTwo";
import StepThree from "../Steps/StepThree";

const getSteps = () => {
  return ["Method", "Details", "Verified"];
};

const VerifiationStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [vMethod, setVMethod] = useState("");
  const steps = getSteps();

  useEffect(() => {
    console.log(vMethod);
  }, [vMethod]);

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
          />
        );
      case 2:
        return <StepThree />;
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

  return (
    <div>
      <Stepper activeStep={currentStep}>
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
    </div>
  );
};

export default VerifiationStepper;
