import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Icon
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { roomActions } from "../../../actions";
import { useDispatch } from "react-redux";
import image from "../../../assets/image/pvp.svg"

const useStyles = makeStyles((theme) => ({
  board_room: {
    maxWidth: 273,
    minWidth: 200,
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
  const dispatch = useDispatch();

  function handelCard() {
    dispatch(roomActions.joinRoom(id));
  }

  return (
    <>
      <Card className={classes.board_room}>
        <CardHeader
          style={{ textAlign: "left", padding: "8px" }}
          title={`Room: ${id}`}
          onClick={handelCard}
        />
        <CardContent onClick={handelCard}>
          <Icon style ={{ textAlign: 'center',height: "100%", width: "50%", margin: "0 auto"}}>
            <img style ={{width: "40%", marginLeft: "30%"}} className={classes.imageIcon} src={image}/>
          </Icon>
        </CardContent>
        <Divider light />
      </Card>
    </>
  );
}
