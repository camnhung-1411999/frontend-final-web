import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
  CircularProgress,
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

const CardPerson = ({ className, ...rest }) => {
  const classes = useStyles();
  const [avatar, setAvatar] = useState();

  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 3
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={user.avatar} />
          <CircularProgress
            variant="determinate"
            size={120}
            className={classes.fabProgress}
            value={progress}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h4"
            style={{ marginTop: "40px" }}
          >
            {user.name}
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
