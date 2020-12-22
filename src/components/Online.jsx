import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
  withStyles,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Badge,
  Avatar,
} from "@material-ui/core";
import { FixedSizeList } from "react-window";
import PersonIcon from "@material-ui/icons/Person";
import AutoSizer from "react-virtualized-auto-sizer";
import TimelineDot from "@material-ui/lab/TimelineDot";
import { socket } from "../helpers";
import { userActions } from "../actions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  online: {
    height: "85vh"
  },
  box: {
    height: "100%",
  },
  item: {
    margin: "10px",
  },
}));
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);
const renderRow = (data) => (props) => {
  const { index, style } = props;
  return (
    <ListItem button style={style} key={index}>
      <ListItemAvatar key={index}>
        <StyledBadge
          key={index}
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
        >
          <Avatar src="/static/media/image.8131c036.jpg" />
        </StyledBadge>
      </ListItemAvatar>
      <ListItemText primary={`${data.items[index].name}`} />
      {/* <TimelineDot style={{marginTop:'20px', backgroundColor:'#31a24c'}} /> */}
    </ListItem>
  );
};

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

const Online = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(userActions.getUserOnline());
  }, []);

  useEffect(() => {
    socket.on("online", (data) => {
      dispatch(userActions.userOnline(data));
    });
  }, []);

  useEffect(() => {
    socket.on("offline", (data) => {
      dispatch(userActions.userOffline(data));
    });
  }, []);

  return (
    <Card className={clsx(classes.online, className)} {...rest}>
      <CardHeader title="Online" style={{ color: "#31a24c" }} />
      <Divider />
      <CardContent className={classes.box}>
        <Box className={classes.box} position="relative">
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeList
                height={height}
                width={width}
                itemSize={70}
                itemCount={users.items ? users.items.length : 0}
              >
                {renderRow({ items: users.items })}
              </FixedSizeList>
            )}
          </AutoSizer>
        </Box>
      </CardContent>
    </Card>
  );
};

Online.propTypes = {
  className: PropTypes.string,
};

export { Online };
