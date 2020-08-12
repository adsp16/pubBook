import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    color: "red",
  },
  stackedSpacing: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  largeIcon: {
    fontSize: "3rem",
  },
  topmargin: {
    marginTop: "1rem",
  },
  icon: {
    height: "5rem",
    width: "auto",
    color: theme.palette.darkGrey.main,
  },
}));
