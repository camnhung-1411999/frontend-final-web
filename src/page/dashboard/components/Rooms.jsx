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
  useTheme,
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
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  MoreVert as MoreIcon,
  PlayForWork as PlayForWorkIcon,
} from "@material-ui/icons";

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
      marginLeft: "10px"
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
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
  const rooms = useSelector((state) => state.rooms.items);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [idroom, setIdRoom] = useState("");

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
          component="div"
          style={{ color: "white" }}
          action={
            <>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
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
                {/* <Button
                  variant="contained"
                  color="primary"
                  // className={classes.button}
                  // onClick={handleJoin}
                  startIcon={<PlayForWorkIcon />}
                >
                  Join
                </Button> */}
                <IconButton
                  style={{ padding: "6px" }}
                  aria-label="new room"
                  // onClick={handleJoin}
                >
                  <PlayForWorkIcon style={{ fontSize: 30, color: "white" }} />
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
