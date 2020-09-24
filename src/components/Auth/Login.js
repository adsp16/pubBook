import React, { useState, useCallback, useContext } from "react";
import { useStyles } from "./LoginJSS";
import { useForm } from "../../hooks/useForm";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ErrorAlert from "../Alerts/ErrorAlert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";
import { auth, app } from "../../firebase/config";
import { withRouter, Redirect } from "react-router-dom";
import { AuthContext } from "../../Context/AuthUserProvider";

const Login = (props) => {
  const classes = useStyles();
  const [formData, setData] = useForm({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleChangeLogin = (event) => {
    setData(event);
  };

  const submitLogin = useCallback(
    (event) => {
      event.preventDefault();
      const { email, password } = formData;

      auth
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          props.history.push("/admin-dashboard");
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage("Username or password is incorrect");
          setOpen(true);
        });
    },
    [props.history, formData]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to={"/admin-dashboard"} />;
  }

  return (
    <React.Fragment>
      <Box w={100} m={4} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary">
          Dashboard
        </Button>
      </Box>
      <ErrorAlert open={open} setOpen={setOpen} errorMessage={errorMessage} />
      <Container component="main" maxWidth="xs">
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form onSubmit={submitLogin} className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChangeLogin}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChangeLogin}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Log in
              </Button>
              <Grid container>
                <Grid item xs alignContent="flex-start">
                  <Box display="flex" justifyItems="flex-start">
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Box>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default withRouter(Login);
