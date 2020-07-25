import React, { useCallback } from "react";
import { Grid, Box, Typography, Paper, Button } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import { useStyles } from "../Steps/StepOneJSS";

const StepOne = ({ nextStep, setVerifiMethod }) => {
  const classes = useStyles();

  const forwardStep = (id) => {
    console.log(id);
    setVerifiMethod(id);
    nextStep();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button
          onClick={() => forwardStep("sms")}
          fullWidth={true}
          classes={{ root: classes.LargeButton, label: classes.ButtonLabel }}
        >
          <Paper className={classes.PaperBox} elevation={4}>
            <Box display="flex" alignItems="center">
              <PhoneIphoneIcon className={classes.Icon} />
              <Typography gutterBottom>Verify With SMS</Typography>
            </Box>
          </Paper>
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={() => forwardStep("email")}
          fullWidth={true}
          classes={{ root: classes.LargeButton, label: classes.ButtonLabel }}
        >
          <Paper className={classes.PaperBox} elevation={4}>
            <Box display="flex" alignItems="center">
              <MailOutlineIcon className={classes.Icon} />
              <Typography>Verify With Email</Typography>
            </Box>
          </Paper>
        </Button>
      </Grid>
    </Grid>
  );
};

export default StepOne;
