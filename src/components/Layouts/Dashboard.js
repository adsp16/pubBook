import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import useStyles from "./DashboardJSS";
import PhonelinkRingIcon from "@material-ui/icons/PhonelinkRing";
import { useTheme } from "@material-ui/core/styles";
import pbLogo from "../../theme/images/PubBookLogo.png";
import { useLogout } from "../../hooks/useLogout";

const Dashboard = (props) => {
  const classes = useStyles();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logout] = useLogout();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        {[
          { name: "User", funct: null },
          { name: "Logout", funct: logout },
        ].map((obj, index) => (
          <ListItem key={index} button>
            <ListItemText primary={obj.name} onClick={obj.funct} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar color="white" position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Box display="flex">
              <Box display="flex" alignItems="center">
                <Typography
                  align="center"
                  style={{ marginRight: "1rem" }}
                  variant="h4"
                >
                  Pub Book
                </Typography>
              </Box>
              <img className={classes.logo} src={pbLogo}></img>
              {/* <PhonelinkRingIcon fontSize="large" /> */}
            </Box>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
