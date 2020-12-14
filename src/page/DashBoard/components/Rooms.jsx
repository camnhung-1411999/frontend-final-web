import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import Board from "./Board";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {roomActions} from '../../../actions';
import {useDispatch, useSelector} from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));


const Rooms = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleRoom = () => {
    dispatch(roomActions.create())
  };
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title="Rooms"
        action={
          <IconButton
            style = {{paddingBottom: '0px'}}
            aria-label="new room"
            onClick={handleRoom}
          >
            <AddIcon style={{ fontSize: 30 }} color="primary" />
          </IconButton>
        }
      />
      <Divider />
      <CardContent>
        <Board />
      </CardContent>
    </Card>
  );
};

Rooms.propTypes = {
  className: PropTypes.string,
};

export default Rooms;
