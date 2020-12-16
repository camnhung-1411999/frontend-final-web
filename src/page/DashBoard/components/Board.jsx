import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import { useHistory } from "react-router-dom";
import { ExitToAppRounded } from "@material-ui/icons";
import { roomActions } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { history, socket } from "../../../helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    minWidth: 300,
    margin: "10px",
    color: "black",
    border: "1px solid blue",
    float: "left",
    borderRadius: 3,
    "&:hover": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
  media: {
    height: 0,
  },
  description: {
    color: "black",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    backgroundColor: red[500],
  },
  divider: {
    height: 1,
    backgroundColor: "blue",
  },
}));

export default function Board({ id }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  function handelCard() {
    socket.emit("joinRoom", id);
    history.push(`/board/${id}`);
  }

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          style={{ textAlign: "left" }}
          title={`ID: #${id}`}
          onClick={handelCard}
        />
        <CardContent onClick={handelCard}>
          <Typography
            style={{ textAlign: "left" }}
            className={classes.description}
          ></Typography>
        </CardContent>
        <Divider light />
        <CardActions disableSpacing>
          <IconButton
            className={classes.expand}
            aria-expanded={expanded}
            aria-label="show more"
            onClick={() => handelCard()}
          >
            <ExitToAppRounded style={{ color: "blue" }} />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
