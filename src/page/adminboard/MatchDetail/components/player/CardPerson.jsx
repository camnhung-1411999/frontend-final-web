import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { green } from "@material-ui/core/colors";

const user = {
  avatar: "/static/media/image.8131c036.jpg",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Smith",
  timezone: "GTM-7",
};

const useStyles = makeStyles(() => ({
  root: {
    border: "1px solid blue",
  },
  avatar: {
    height: 100,
    width: 100,
    marginTop: "10px",
  },
  input: {
    display: "none",
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
  },
}));

const CardPerson = ({ className,player,status, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <h2>{status}</h2>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h4"
            component = "div"
            style={{ marginTop: "40px" }}
          >
            {player}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

CardPerson.propTypes = {
  className: PropTypes.string,
};

export default CardPerson;
