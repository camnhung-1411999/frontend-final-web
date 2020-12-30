import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import Board from "./Board";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
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
  InputBase,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { roomActions } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Search as SearchIcon } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  room: {
    height: "100%",
    backgroundImage:
      "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
  },
  cardContent: {
    height: "100%",
  },
  search: {
    float: "left",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.2),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.3),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    "@media (max-width: 780px)": {
      width: "50%",
      marginLeft: "10px",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    "@media (max-width: 780px)": {
      width: "70%",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    button: {
      margin: theme.spacing(1),
    },
  },
}));

const Rooms = ({ className, ...rest }) => {
  const classes = useStyles();
  const rooms = useSelector((state) => state.rooms);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [idroom, setIdRoom] = useState("");
  const [openPublic, setOpenPublic] = useState(false);

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
    dispatch(roomActions.create(checked, password));
  };

  const handlePublic = (id) => {
    setIdRoom(id);
    if (id) dispatch(roomActions.getRoom(id, rooms.items));
  };

  const handleJoin = () => {
    dispatch(roomActions.joinRoom(idroom, password));
  };

  useEffect(() => {
    dispatch(roomActions.listRooms());
  }, []);

  useEffect(() => {
    setOpenPublic(rooms.isPublic);
  }, [rooms]);

  return (
    <>
      <Card className={clsx(classes.room, className)} {...rest}>
        <CardHeader
          title="Rooms"
          component="div"
          style={{ color: "white" }}
          action={
            <>
              <div className={classes.search}>
                <div className={classes.searchIcon}></div>
                <InputBase
                  placeholder="Id"
                  value={idroom}
                  onChange={(e) => setIdRoom(e.target.value)}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
                <IconButton
                  style={{ padding: "6px" }}
                  aria-label="new room"
                  onClick={() => handlePublic(idroom)}
                >
                  <SearchIcon style={{ fontSize: 30, color: "white" }} />
                </IconButton>
              </div>

              <IconButton
                style={{ padding: "6px" }}
                aria-label="new room"
                onClick={handleClickOpen}
              >
                <AddIcon style={{ fontSize: 30, color: "white" }} />
              </IconButton>
            </>
          }
        ></CardHeader>
        <Divider />
        <CardContent className={classes.cardContent}>
          {rooms.items?.map((element) => (
            <Board
              key={element.idroom}
              id={element.idroom}
              board={element}
              handelClick={() => handlePublic(element.idroom)}
            />
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
                name="password"
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
      <Dialog
        open={openPublic}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Enter password"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              variant="outlined"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPublic(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleJoin} color="primary" autoFocus>
            Join
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
