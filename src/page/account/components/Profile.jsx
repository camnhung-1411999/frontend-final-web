import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import image from "../../../assets/image/image.jpg"

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
  Badge
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import {UserService} from "../../../services";

const user = {
  avatar: '/static/media/image.8131c036.jpg',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  },
  input: {
    display: 'none',
  },
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const [avatar, setAvatar] = useState();

  const handelAvatar = async (file) => {
    const formData = new FormData();
    formData.append('myImage', file, file.name);
    await UserService.uploadAvatar(formData).then((reponse) =>{
      setAvatar(reponse.data.file);
    })
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            badgeContent={
              <>
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={(e) => handelAvatar(e.target.files[0])}/>
                <label htmlFor="icon-button-file">
                  <IconButton color="secondary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
              </>
            }
          >
            <Avatar
              className={classes.avatar}
              src={user.avatar}
            />
          </Badge>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.name}
          </Typography>
          {/* <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${user.city} ${user.country}`}
          </Typography> */}
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export { Profile };
