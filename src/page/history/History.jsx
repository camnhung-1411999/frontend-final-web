import React,{useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";    
import {useParams} from "react-router-dom";
const API_URL = "https://localhost:8000/history/";

function HistoryItem(prop) {
  const classes = useStyles();
  return (
    <Button className={classes.item} variant="outlined" color="primary">
      RoomID - {prop.roomid}
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
    color: "#5A0BBA"
  }
}));

const History = () => {
  const {user} = useParams();
  const [listHistory, setListHistory] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    axios.get(`http://localhost:8000/history/${user}`)
        .then(function (response) {
            setListHistory(response.data);
            console.log('get list history response.data: ', response.data)
        })
        .catch(function (error) {
            console.log(error);
        })


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
            <HistoryItem roomid={history.idroom}></HistoryItem>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export {History}
