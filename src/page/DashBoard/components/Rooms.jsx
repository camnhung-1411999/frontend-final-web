import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { roomActions } from '../../../actions/room.action';
import { useDispatch, useSelector } from 'react-redux';

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
  const rooms = useSelector(state => state.rooms.items);
  const dispatch = useDispatch();

  const classes = useStyles();
  useEffect(() => {
    dispatch(roomActions.listRooms());
  }, []);

  function FormRow() {
    return (
      <React.Fragment>
        {rooms?.data.map((element) => (
          <Grid item xs={4} className='room'>
          <Paper className={classes.paper} style={{ width: "70%" }}>
            ID: #{element.idroom}
          </Paper>
        </Grid>
        ))}
        {/* <Grid item xs={4} className='room'>
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
        </Grid> */}
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
