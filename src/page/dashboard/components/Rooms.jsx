import React, { useEffect, useState } from "react";
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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Switch,
  FormControlLabel,
  Fade,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { roomActions } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  room: {
    height: "100%",
    backgroundImage:
      "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
  },
}));

const Rooms = ({ className, ...rest }) => {
  const classes = useStyles();
  const rooms = useSelector((state) => state.rooms.items);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(roomActions.listRooms());
  }, []);
  const handleAddRoom = () => {
    dispatch(roomActions.create());
  };
  return (
    <>
      <Card className={clsx(classes.room, className)} {...rest}>
        <CardHeader
          title="Rooms"
          action={
            <IconButton
              style={{ paddingBottom: "0px" }}
              aria-label="new room"
              onClick={handleClickOpen}
            >
              <AddIcon style={{ fontSize: 30 }} color="primary" />
            </IconButton>
          }
        />
        <Divider />
        <CardContent>
          {rooms?.data.map((element) => (
            <Board key={element.idroom} id={element.idroom} />
          ))}
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Create room"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} />}
              label="Password"
            />
            <Fade
              in={checked}
              style={!checked ? { display: "none" } : { display: "flex" }}
            >
              <TextField
                fullWidth
                label="Password"
                margin="normal"
                name="confirm"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                variant="outlined"
              />
            </Fade>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary" autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Rooms.propTypes = {
  className: PropTypes.string,
};

export default Rooms;
