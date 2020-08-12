import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  largeButton: {
    padding: 0,
    textTransform: "none",
    zIndex: 1500,
  },
  PaperBox: {
    height: "100%",
    width: "100%",
    padding: "1rem",
    margin: 0,
  },
  Icon: {
    fontSize: "7rem",
    marginRight: "2rem",
    color: theme.palette.darkGrey.main,
  },
  ButtonLabel: {
    textTransform: "none",
  },
}));
