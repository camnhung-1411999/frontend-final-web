import React, { useState, useEffect } from "react";
import { Button, CssBaseline, TextField, Grid, Typography, Container, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import {useLocation} from "react-router-dom";
import { useDispatch } from 'react-redux';
import {socket} from '../../../helpers';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { userActions } from '../../../actions';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 5),
  },
}));

function SignUp() {
  const classes = useStyles();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [repeat_password, setRepeatPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [open, setOpen] = useState(false);
  const [iopen, setIOpen] = useState(false);
  const [status, setStatus] = useState();
  const location = useLocation()
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('success', () => {
      window.alert('CONFIRM EMAIL SUCCESS')
    })
  }, [])

  function handelPassword() {
    if (password !== repeat_password) {
      setStatus("Mật khẩu không trùng khớp");
      return false;
    }
    return true;
  }

  async function handleButton() {
    if (handelPassword()) {
      const data = {
        firstName:firstName,
        lastName:lastName,
        user: username,
        role: 'user',
        password,
      }

      const {from} = location.state || { from: { pathname: "/home" } };

      dispatch(userActions.register(data, from));
      setIOpen(true);
    } else setOpen(true);
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleCloseBox = () => {
    setIOpen(false);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          SignUp
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                autoComplete="lname"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="repeat_password"
                label="Repeat password"
                type="password"
                id="repeat_password"
                autoComplete="current-reapeat-password"
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleButton()}
            className={classes.submit}
          >
            SignUp
          </Button>
        </form>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            {status}
          </Alert>
        </Snackbar>
      </div>
      <Dialog
        open={iopen}
        onClose={handleCloseBox}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">GREATE!!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            We sent a mail for you. Please check your email to finish create account and join with us !!
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBox} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
export { SignUp };