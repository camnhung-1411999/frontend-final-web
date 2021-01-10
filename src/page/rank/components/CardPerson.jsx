import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Avatar,
  CardContent,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  large: {
    width: theme.spacing(13),
    height: theme.spacing(13),
    margin: "5px auto",
    "@media (max-width: 780px)": {
      width: theme.spacing(7),
      height: theme.spacing(7),
      padding: "0",
    },
  },
  cardHeader: {
    fontSize: "24px",
    textAlign: "center",
    padding: "5px",
    "@media (max-width: 780px)": {
      fontSize: "14px",
      padding: "2px",
    },
  },
}));

export default function CardPerson(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={(classes.root, props.styleCss)}>
      <CardContent style={{ padding: 0 }}>
        <Typography
          className={classes.cardHeader}
          variant="body2"
          component="h2"
        >
          {props.user?.name}
        </Typography>
        <Avatar className={classes.large} src={props.user?.image} />
        <Typography
          className={classes.cardHeader}
          variant="body2"
          component="h2"
        >
          {props.user?.cups} cups
        </Typography>
      </CardContent>
    </Card>
  );
}
