import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserActivityTable from "../components/User/Lists/UserActivityTable";

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
  return (
    <div className={classes.backDrop}>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <UserActivityTable />
        </Grid>
        <Grid item container></Grid>
      </Grid>
    </div>
  );
};

export default Admin;
