import React, { useState } from "react";
import StepOne from "../components/Steps/StepOne";
import VerificationStepper from "../components/Stepper/Stepper";
import { Container, Box } from "@material-ui/core";

const Entry = () => {
  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Container maxWidth="sm">
        <VerificationStepper />
      </Container>
    </Box>
  );
};

export default Entry;
