import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  CssBaseline,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import { ReactComponent as GoogleIcon } from "../../../assets/image/google.svg";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { alertActions, userActions } from "../../../actions";
import ForgotPwd from "./ForgotPwd";

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
    margin: theme.spacing(1, 0, 2),
  },
}));

function SignIn() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  function handleButton() {
    const data = {
      user: username,
      password: password,
    };
    if (username && password) {
      const { from } = location.state || { from: { pathname: "/home" } };
      dispatch(userActions.login(data, from));
    } else {
      dispatch(alertActions.error("Fields must not be empty"));
    }
  }

  function loginSocial(data) {
    const { from } = location.state || { from: { pathname: "/home" } };
    dispatch(userActions.loginSocial(data, from));
  }

  const responseGoogle = async (response) => {
    if (response?.profileObj) {
      const data = {
        user: response.profileObj.email,
        name: response.profileObj.name,
        password: response.googleId,
        role: "user",
      };
      loginSocial(data);
    }
  };
  const responseFacebook = async (response) => {
    if (response) {
      const data = {
        user: response.email,
        name: response.name,
        role: "user",
        password: response.id,
      };
      loginSocial(data);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email"
            name="username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            style={{ float: "left" }}
            control={<Checkbox value="remember" color="primary" />}
            label="Remember password"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleButton}
            className={classes.submit}
          >
            Login
          </Button>
        </form>
        <ForgotPwd />
        <GoogleLogin
          clientId="428605288080-isorsmi41thagu8mo2gn8bbai1e06r04.apps.googleusercontent.com"
          className="btnGoogle"
          icon={false}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        >
          <GoogleIcon style={{ width: "40px" }} color="red" />
        </GoogleLogin>
        <FacebookLogin
          appId="190986092743852"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          version="1.0"
          cssClass="btnFacebook"
          icon={false}
          textButton={
            <FacebookIcon
              style={{
                fontSize: 50,
                height: "64px",
                margin: "0px 4px 0px 4px",
              }}
            />
          }
        ></FacebookLogin>
      </div>
    </Container>
  );
}
export { SignIn };
