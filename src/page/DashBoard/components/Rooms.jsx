import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Rooms() {
  const classes = useStyles();

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={4} className='room'>
          <Paper className={classes.paper} style={{ width: "70%" }}>
            ID: #1001
          </Paper>
        </Grid>
        <Grid item xs={4} className='room'>
          <Paper className={classes.paper} style={{ width: "70%" }}>
            ID: #1001
          </Paper>
        </Grid>
        <Grid item xs={4} className='room'>
          <Paper className={classes.paper} style={{ width: "70%" }}>
            ID: #1001
          </Paper>
        </Grid>
        <Grid item xs={4} className='room'>
          <Paper className={classes.paper} style={{ width: "70%" }}>
            ID: #1001
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} style={{ width: "70%" }}>
            ID: #1001
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} style={{ width: "70%" }}>
            ID: #1001
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} style={{ width: "70%" }}>
            ID: #1001
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} style={{ width: "70%" }}>
            ID: #1001
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} style={{ width: "70%" }}>
            ID: #1001
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3} style={{ marginTop: "1%" }}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}
