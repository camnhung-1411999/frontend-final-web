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
  IconButton,
  colors,
  Badge,
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../../actions";

const useStyles = makeStyles(() => ({
  profile: {},
  avatar: {
    height: 100,
    width: 100,
  },
  input: {
    display: "none",
  },
  box: {
    display: "flex",
    margin: "0 auto",
    "@media (max-width: 780px)": {
      display: "inherit",
    },
  },
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const user = useSelector((state) => state.users.profile);
  const dispatch = useDispatch();

  const handelAvatar = async ({ target }) => {
    const data = new FormData();
    data.append("file", target.files[0]);
    dispatch(userActions.update(data));
  };


  return (
    <Card className={clsx(classes.profile, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                  onChange={handelAvatar}
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="secondary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </>
            }
          >
            <Avatar
              className={classes.avatar}
              src={user?.image ? user.image : null}
            />
          </Badge>
          <Typography
            color="textPrimary"
            component="div"
            gutterBottom
            variant="h3"
          >
            {user?.name}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export { Profile };
