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
  Typography,
  Grid,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { useDispatch } from "react-redux";
import { userActions } from "../../../actions";
import { alertActions } from "../../../actions";

const useStyles = makeStyles((theme) => ({
  password: {
    width: "100%",
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
  column: {
    flexBasis: "33.33%",
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

function Password() {
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
        } else
          {
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
        >
          <div className={classes.column}>
            <Typography component="div" variant="h5">
              Change Password
            </Typography>
          </div>
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
export { Password };
