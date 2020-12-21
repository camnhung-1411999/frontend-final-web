import React, { useEffect} from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import Board from "./Board";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
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
  const rooms = useSelector(state => state.rooms.items)
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(roomActions.listRooms());
  },[])
  const handleAddRoom = () => {
    dispatch(roomActions.create());
  }
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title="Rooms"
        action={
          <IconButton
            style = {{paddingBottom: '0px'}}
            aria-label="new room"
            onClick={handleAddRoom}
          >
            <AddIcon style={{ fontSize: 30 }} color="primary" />
          </IconButton>
        }
      />
      <Divider />
      <CardContent>
        {rooms?.data.map((element) => (
          <Board id = { element.idroom}/>
        ))}
      </CardContent>
    </Card>
  );
};

Rooms.propTypes = {
  className: PropTypes.string,
};

export default Rooms;
