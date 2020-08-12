import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Button,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import NoEncryptionIcon from "@material-ui/icons/NoEncryption";
import { useStyles } from "../Steps/StepOneJSS";

const StepOne = ({ nextStep, setVerifiMethod }) => {
  const classes = useStyles();
  const [noConfirm, setNoConfirm] = useState(false);

  const forwardStep = (id) => {
    setVerifiMethod(id);
    nextStep();
  };

  const handleNoConfirm = () => {
    setNoConfirm((prevState) => !prevState);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box mr={2} display="flex" justifyContent="flex-end">
          <FormControlLabel
            control={
              <Switch
                checked={noConfirm}
                onChange={handleNoConfirm}
                color="primary"
              ></Switch>
            }
            label="No Confirmation"
          />
        </Box>
      </Grid>
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
      {noConfirm && (
        <Grid item xs={12}>
          <Button
            onClick={() => forwardStep("noconfirm")}
            fullWidth={true}
            classes={{ root: classes.LargeButton, label: classes.ButtonLabel }}
          >
            <Paper className={classes.PaperBox} elevation={4}>
              <Box display="flex" alignItems="center">
                <NoEncryptionIcon className={classes.Icon} />
                <Typography>Sign In No Confirmation</Typography>
              </Box>
            </Paper>
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default StepOne;
