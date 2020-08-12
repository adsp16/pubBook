import React from "react";
import { Grid, Box, Typography, Button } from "@material-ui/core";
import SuccessTick from "../../components/Icons/SuccessTick";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

const StepThree = ({ backStep, getExactStep }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center">
          <SuccessTick />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box mb={4}>
          <Typography variant="h2">Success</Typography>
          <Typography>You have been added to this location</Typography>
          <Box mt={2}>
            <Button
              color="primary"
              onClick={() => getExactStep(0)}
              variant="contained"
            >
              Start Again
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid container item xs={12} justify="space-between">
        <Box onClick={backStep} variant="contained">
          <ArrowBack />
        </Box>
      </Grid>
    </Grid>
  );
};

export default StepThree;
