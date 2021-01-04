import React, { useState } from "react";
import {
  Button,
  Divider,
  TextField,
  makeStyles,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Grid,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { useDispatch } from "react-redux";
import { userActions } from "../../../actions";
import { alertActions } from "../../../actions";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  password: {
    width: "100%",
    marginTop: '3%'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },

  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

function ItemHistory() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    oldpassword: "",
    password: "",
    confirm: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handelUpdate = () => {
    if (!values.password || !values.confirm || !values.oldpassword) {
      dispatch(alertActions.error("Feild not empty."));
    } else {
      if (values.password != values.confirm) {
        dispatch(alertActions.error("Password are not matching."));
      } else {
        if (values.password == values.oldpassword) {
          dispatch(
            alertActions.error(
              "Password and Old Password must not be the same."
            )
          );
        } else {
            dispatch(
              userActions.updatePassword(values.password, values.oldpassword)
            );
          }
      }
    }
  };
  return (
    <div className={classes.password}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
          style={{backgroundColor: 'rgb(157, 215, 238)'
        }}
        >
           <p>WIN <span><AccountCircleIcon/></span>minh blues<span>22/11/2020</span>      times: 30mins</p>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Old password"
                margin="normal"
                name="oldpassword"
                onChange={handleChange}
                type="password"
                value={values.oldpassword}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="New password"
                margin="normal"
                name="password"
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Confirm password"
                margin="normal"
                name="confirm"
                onChange={handleChange}
                type="password"
                value={values.confirm}
                variant="outlined"
                required
              />
            </Grid>
          </Grid>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button color="primary" variant="contained" onClick={handelUpdate}>
            Update
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
export { ItemHistory };
