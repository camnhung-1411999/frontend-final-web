import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import { userService } from "../../../../services/index";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
  colors,
} from "@material-ui/core";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import BeenhereIcon from '@material-ui/icons/Beenhere';



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

const Profile = ({ className,username, ...rest }) => {
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
    const getUser = async() => {
      await userService.getUserById(username).then(function (response) {
        setUser(response.data);
      });
    }
    getUser();
  }, [])

  const parameter = [
    {
      title: "Rate win",
      icon: ThumbUpIcon,
      color: colors.indigo[500],
      value: user?.win  ? (user?.win / user.totalMatch)*0.1*100 + '%' : 0 + '%',
    },
    {
      title: "Total match",
      icon: BeenhereIcon,
      color: colors.black,
      value: user?.totalMatch ? user.totalMatch : 0,
    },
    {
      title: "Cups",
      icon: EmojiEventsIcon,
      color: colors.orange[600],
      value: user?.cups ? user.cups : 0,
    },
  ];
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={user.image} />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {user.name}
          </Typography>
         
          <Typography
            className={classes.datetime}
            color="textSecondary"
            variant="body1"
          >
            {`${moment(user.createdAt).format("dd-mm-yyyy")}`}
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
              <Typography
                color="textPrimary"
                component="div"
                variant="body1"
                style={{ color }}
              >
                {title}
              </Typography>
              <Typography style={{ color }} component="div" variant="h5">
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
