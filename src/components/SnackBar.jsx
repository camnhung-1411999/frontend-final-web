import React, { useState,useEffect } from "react";
import { Snackbar } from "@material-ui/core";
import {useSelector } from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackBar() {
  const [openError, setOpenError] = useState(false);
  const err = useSelector((state) => state.alert);
  useEffect(() => {
    setOpenError(err?.message ? true : false);
  }, [err]);
  return (
    <div className="sss">
      <Snackbar
        open={openError}
        autoHideDuration={2000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenError(false)} severity="error">
          {err?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export { SnackBar };
