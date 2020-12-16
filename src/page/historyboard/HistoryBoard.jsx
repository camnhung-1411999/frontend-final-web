import React,{useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import History from './components/History';
import Board from './components/Board';
import axios from "axios";    
import { urlConstants } from "../../constants";

const API_URL = urlConstants.API_URL_HISTORY;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const HistoryBoard = () => {
  const classes = useStyles();
  const initdata =
  {
      "data": [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
      ],
      "winner": "",
      "loser": "",
      "created": ""
  }
  const [boardData, setBoardData] = useState(initdata);
  function handleClick(id) {
    axios.get(`${API_URL}`+`result/${id}`)
    .then(function (response) {
        setBoardData(response.data);
        console.log('get list history response.data: ', response.data)
    })
    .catch(function (error) {
        console.log(error);
    })
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={4}>
          <History onClick={(id) => handleClick(id)} ></History>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Board data ={boardData} ></Board>
        </Grid>
      </Grid>
    </div>
  );
};

export {HistoryBoard}
