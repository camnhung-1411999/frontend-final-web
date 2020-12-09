import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "../assets/css/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/image/123.png";
import {SignIn, SignUp} from "./component";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button: {
    float: 'right',
  },
}));

export default function Home() {
  const classes = useStyles();
  const [title, setTitle] = useState("SignUp");
  const [hide, setHide] = useState(true);
  
  const handelSwitch = () => {  
    !hide ? setTitle("SignUp") : setTitle("Login")
    setHide(!hide)
  };

  return (
    <div className="container home register">
      <div className="row">
        <div className="col-md-4 register-left">
          <img src={logo} alt="" style={{ width: "100%" }} />
          {/* <h2>Welcome</h2> */}
          {/* <h4>I'm Pham Ba Minh</h4> */}
          
        </div>
        <div className="col-md-7 register-right">
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" >
              <div className="row register-form">
                {hide? <SignIn/> : <SignUp/>}
              </div>
              <FormControlLabel
                  className={classes.button}
                  control={
                    <Switch
                      checked={hide}
                      onChange={handelSwitch}
                      name="checkedB"
                      color="primary"

                    />
                  }
                  label={title}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
