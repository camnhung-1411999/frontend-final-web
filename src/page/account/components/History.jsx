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
import {ItemHistory} from './ItemHistory';
const useStyles = makeStyles(() => ({
  root: {},
}));

const History = ({ className, ...rest }) => {
  const classes = useStyles();
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

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader subheader="Display detail your history" title="HISTORY" />
        <Divider />
        <CardContent>
          <ItemHistory/>
          <ItemHistory/>
          <ItemHistory/>
          <ItemHistory/>
          <ItemHistory/>
          <ItemHistory/>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
        </Box>
      </Card>
    </form>
  );
};

History.propTypes = {
  className: PropTypes.string,
};

export { History };
