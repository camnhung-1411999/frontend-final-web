import React from "react";
import {
  Container,
  Grid,
  makeStyles
} from "@material-ui/core";
import CardPerson from "./CardPerson";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  box: {
    display: "flex",
    "@media (max-width: 780px)": {
      display: "inherit",
    },
  },
  card: {
    margin: "20px 20px 15px 20px",
    border: "1px solid blue",
    "@media (max-width: 780px)": {
      margin: "15px",
    },
  },
  grid: {
    "@media (min-width: 1025px)": {
      transform: "translateY(10%)",
    },
  },


}));


const Player = ({history}) => {
  const classes = useStyles();

  return (
    <Container
      maxWidth={false}
      style={{ height: "100%"}}
    >
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.grid}
      >
        <Grid item lg={12} sm={4} xl={12} xs={4}>
          <CardPerson className={classes.card} player = {history?.winner} status ="winner"/>
        </Grid>
        <Grid item lg={12} md={4} xl={12} xs={4}>
          <CardPerson className={classes.card} player = {history?.loser} status ="loser" />
        </Grid>
      </Grid>
    </Container>
  );
};

export { Player };
