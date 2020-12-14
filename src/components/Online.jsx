import React, {useEffect} from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import { FixedSizeList } from "react-window";
import PersonIcon from "@material-ui/icons/Person";
import AutoSizer from "react-virtualized-auto-sizer";
import TimelineDot from '@material-ui/lab/TimelineDot';
import {socket} from '../helpers';
import {userActions} from '../actions';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  box: {
    height: "100%",
  },
  item: {
    margin: "10px",
  },
}));
const renderRow = data =>props => {
  const { index, style } = props;
  console.log('dataaaaa:', data.items[0] )
  return (
      <ListItem button style={style} key={index}>
        <ListItemAvatar key={index}>
          <Avatar key={index}>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${data.items[index].name}`} />
        <TimelineDot style={{marginTop:'20px', backgroundColor:'#31a24c'}} />
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
  const users = useSelector(state => state.users);

  useEffect(()=>{
    dispatch(userActions.getUserOnline());
  },[])

  useEffect(()=>{
    socket.on('online', (data) => {
      dispatch(userActions.userOnline(data));
    });
  },[])

  useEffect(()=>{
    socket.on('offline', (data) => {
      dispatch(userActions.userOffline(data));
    });
  },[])

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Online" style = {{color: '#31a24c'}} />
      <Divider />
      <CardContent className={classes.box}>
        <Box className={classes.box} position="relative">
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeList
                height={height}
                width={width}
                itemSize={70}
                itemCount={users.items? users.items.length : 0}
              >
                {renderRow({items : users.items})}
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
