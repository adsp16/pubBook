import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    color: "red",
  },
  spacing: {
    margin: theme.spacing(2),
  },
  largeIcon: {
    fontSize: "3rem",
  },
}));
