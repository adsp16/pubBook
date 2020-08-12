import React, { useState } from "react";
import { Button, Snackbar } from "@material-ui/core";

import { Alert, AlertTitle } from "@material-ui/lab";
import { useStyles } from "./SuccessAlertJSS";

const SuccessAlert = ({ open, setOpen, successMessage }) => {
  const styles = useStyles();

  const handleClose = (event, reason) => {
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
          severity="success"
        >
          <AlertTitle> Success</AlertTitle>
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SuccessAlert;
