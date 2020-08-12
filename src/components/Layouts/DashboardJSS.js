import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
      color: theme.palette.getContrastText(theme.palette.primary.main),
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      boxShadow: "none",
    },
    [theme.breakpoints.down("sm")]: {
      backgroundColor: theme.palette.primary.main,
    },
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
      color: theme.palette.getContrastText("#FFFFFF"),
      backgroundColor: "white",
    },
    width: drawerWidth,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.grey,
    height: "100vh",
  },
  backdrop: {
    padding: theme.spacing(3),
    height: "100vh",
  },
  logo: {
    height: "auto",
    width: "5rem",
  },
}));

export default useStyles;
