import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserActivityTable from "../components/User/Lists/UserActivityTable";
import ErrorAlert from "../components/Alerts/ErrorAlert";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  backDrop: {
    backgroundColor: theme.palette.primary.grey,
    padding: theme.spacing(3),
  },
}));

const Admin = (props) => {
  const classes = useStyles();
  const [dates, setDates] = useState(new Date());
  const [error, setError] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);

  const handleError = (message) => {
    setError(message);
    setSnackOpen(true);
  };

  return (
    <div className={classes.backDrop}>
      <ErrorAlert
        setOpen={setSnackOpen}
        open={snackOpen}
        errorMessage={error}
      />
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <UserActivityTable handleError={handleError} />
        </Grid>
        <Grid item container></Grid>
      </Grid>
    </div>
  );
};

export default Admin;
