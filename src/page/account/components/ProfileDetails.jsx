import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../../../actions";
import { alertActions } from "../../../actions";
import moment from 'moment';

const useStyles = makeStyles(() => ({
  root: {},
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.profile);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setValues({
      firstName: user?.name.split(" ")[0] + "",
      lastName: user?.name.split(" ")[1] + "",
    });
  }, [user]);

  const handelUpdate = () => {
    if(!values.firstName || !values.lastName) {
      alertActions.error('Field must not be empty');
      return;
    }
    if(values.firstName === (user?.name.split(" ")[0] + "") && values.lastName === (user?.name.split(" ")[0] + "")) {
      alertActions.error('Nothing changed to update');
      return;
    }

    dispatch(
      userActions.update({name: values.firstName + ' ' + values.lastName})
    );

  }
  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                disabled={true}
                required
                value={user?.user + ""}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Created At"
                name="createdAt"
                disabled={true}
                required
                value={moment(user?.createdAt + "").format('HH:mm DD/MM/YYYY')}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" onClick = {handelUpdate}>
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

export { ProfileDetails };
