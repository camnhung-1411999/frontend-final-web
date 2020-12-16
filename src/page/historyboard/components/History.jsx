import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { urlConstants } from "../../../constants";
import { authHeader } from '../../../helpers'
const API_URL = urlConstants.API_URL_HISTORY;

function HistoryItem(props) {
  const classes = useStyles();
  const created = props.created;
  return (
    <Button
      className={classes.item}
      variant="contained"
      color="primary"
      onClick={() => props.onClick(props.id)}
    >
      Created Date - {created}
    </Button>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  list: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  item: {
    width: "50%",
  },
  title: {
    marginTop: "30px",
    color: "#5A0BBA",
  },
}));

export default function History(props) {
  const [listHistory, setListHistory] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    console.log("props", props);
    axios
      .get(API_URL, {
        headers: authHeader(),
      } )
      .then(function (response) {
        setListHistory(response.data);
        console.log("get list history response.data: ", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.list}>
          <Typography variant="h4" className={classes.title}>
            HISTORY
          </Typography>
        </Grid>
        {listHistory.map((history) => (
          <Grid item xs={12} className={classes.list}>
            <HistoryItem
              created ={history.created}
              id ={history._id}
              onClick={(id) => props.onClick(id)}
            ></HistoryItem>
       
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
