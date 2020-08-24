import React, { useState } from "react";
import { Button, Snackbar } from "@material-ui/core";
import { AlertTitle, Alert } from "@material-ui/lab";
import { useStyles } from "./ErrorAlertJSS";

const ErrorAlert = ({ open, setOpen, errorMessage }) => {
  const styles = useStyles();

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          className={styles.AlertRoot}
          variant="filled"
          onClose={handleClose}
          severity="error"
        >
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ErrorAlert;
