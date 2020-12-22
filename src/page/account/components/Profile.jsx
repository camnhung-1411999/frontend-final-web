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
  Button,
  IconButton,
  colors,
  Badge,
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import VictoryIcon from "../../../assets/image/victory.svg";

import { useDispatch } from "react-redux";
import { userActions } from "../../../actions";
import { useSelector } from "react-redux";

import { UserService } from "../../../services";

const user = {
  avatar: "/static/media/image.8131c036.jpg",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
  timezone: "GTM-7",
};

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
  const [avatar, setAvatar] = useState();
  const user = useSelector((state) => state.users.profile);
  const dispatch = useDispatch();

  const handelAvatar = async ({ target }) => {
    const data = new FormData();
    data.append("file", target.files[0]);
    dispatch(userActions.update(data));
  };
  // const handelAvatar = async (file) => {
  //   const formData = new FormData();
  //   formData.append("myImage", file, file.name);
  //   await UserService.updateAvatar(formData).then((reponse) => {
  //     setAvatar(reponse.data.file);
  //   });
  // };
  const parameter = [
    {
      title: "Victory",
      icon: SentimentVerySatisfiedIcon,
      color: colors.indigo[500],
      value: 100,
    },
    {
      title: "Defeat",
      icon: SentimentDissatisfiedIcon,
      color: colors.black,
      value: 100,
    },
    {
      title: "Cups",
      icon: EmojiEventsIcon,
      color: colors.orange[600],
      value: 100,
    },
  ];

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
              src={
                user?.image
                  ? user.image
                  : "data:image/jpeg;base64,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"
              }
            />
          </Badge>
          <Typography color="textPrimary" gutterBottom variant="h3">
            {user?.name}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Box className={classes.box} justifyContent="center" mt={2}>
          {parameter.map(({ color, icon: Icon, title, value }) => (
            <Box
              key={title}
              p={1}
              textAlign="center"
              style={{ margin: "0px 10px 0px 10px" }}
            >
              <Icon style={{ color, fontSize: "40" }} color="action" />
              <Typography color="textPrimary" variant="body1" style={{ color }}>
                {title}
              </Typography>
              <Typography style={{ color }} variant="h5">
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export { Profile };
