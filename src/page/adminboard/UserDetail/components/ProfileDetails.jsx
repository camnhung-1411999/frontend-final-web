import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Switch, 
  FormControlLabel,
  makeStyles,
} from "@material-ui/core";

import { userService } from "../../../../services/index";
const useStyles = makeStyles(() => ({
  root: {},
}));

const ProfileDetails = ({ className,id,  ...rest }) => {
  const classes = useStyles();
  const initProfile = {
    "user": "",
    "name": "",
    "status": null,
    "cups": null,
    "image": null,
    "totalMatch": null,
    "wins": null,
    "block": false
  }

  const [user, setUser] = useState(initProfile);
  useEffect(() => {
    userService.getUserById(id).then(function (response) {
      setUser(response.data);
      setState({checkedBlock: response.data.block})
    });
  }, [])

  const [state, setState] = useState({
    checkedBlock: user.block,
  });
  

  const handleChange =  (event) => {
    const checked = event.target.checked;
    let data ={
      "user": user.user, 
      "block": checked,
    };
    console.log('data',data);
    userService.updateByAdmin(data).then(function (response) {
      setUser(response.data);
      console.log('user',response.data);
    });
    setState({ ...state, [event.target.name]: checked });
  };

  

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                value={user.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                value={user.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Status"
                name="status"
                value={user.status?'active':'inactive'}
                variant="outlined"
              />
            </Grid>
      
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
        <FormControlLabel
        control={
          <Switch
            checked={state.checkedBlock}
            onChange={handleChange}
            name="checkedBlock"
            color="primary"
          />
          
        }
        label={state.checkedBlock===false ? "Active Account" : "Blocked Account"}
      />
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

export { ProfileDetails };
