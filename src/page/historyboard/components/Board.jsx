import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function Square(props) {
  let check="";
  if(props.player===1)
  {
    check="X";
  }
  else if(props.player===2)
  {
    check="O";
  }
  const classes = useStyles();
  return (
    <Button
      className={classes.square}
      variant="outlined"
      color="primary"
    >{check}</Button>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  square: {
    width: "45px",
    height: "45px",
  },
  list: {
    padding: theme.spacing(2),
  },
  title: {
    marginTop: "30px",
    marginLeft: "55px",
    marginBottom: "10px",
    color: "#5A0BBA"
  },
  text: {
    margin: "30px",
    marginBottom: "0px",
    color: "#5A0BBA"
  }
}));

export default function Board(props) {
  const classes = useStyles();
  const data = props.data ;

 return (
    <div className={classes.root}>
      <Grid container spacing={3}>
      <Grid item xs={12} className={classes.list} >
      <Typography variant="h4" className={classes.title}>
        RESULTS
      </Typography>
      </Grid>
      {(() => {
        let table = [];
        for (let i = 0; i < 9; i++) {
          let children = [];
          for (let j = 0; j < 9; j++) {
            children.push(<Square player={data.data[i][j]}/>);
          }
          table.push(<Grid container item xs={12} spacing={3}>{children}</Grid>);
        }
        return table;
      })()}
    <Grid container item xs={12} spacing={3}>
    <Typography variant="h6" className={classes.text}>
    CREATE DATE: {data.created}
  </Typography>
  </Grid>
    <Typography variant="h6" className={classes.text}>
    Winner: {data.winner}
  </Typography>
  <Typography variant="h6" className={classes.text}>
    Loser: {data.loser}
  </Typography>
      </Grid>
    </div>
  );
}
