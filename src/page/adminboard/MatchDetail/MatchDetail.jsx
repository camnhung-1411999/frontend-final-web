import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import {Page} from '../../../components';
import {Board, TabChat, Player} from './components';
import { historyService } from '../../../services';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const MatchDetail = ({match}) => {
  const classes = useStyles();
  const [history, setHistory] = useState();
  useEffect(() => {
    const getMatchHistory = async () => {
      await historyService.adminGetById(match.params.id).then((response) => {
        setHistory(response?.data);
      })
    };
    getMatchHistory();
  }, [])
  if(!history){
    return (<>......loading</>)
  }
  return (
    <Page
      className={classes.root}
      title="Room"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
         
          <Grid
            item
            lg={4}
            sm={6}
            xl={3}
            xs={12}
          >
            
            <Player history = { history }/>
          </Grid>
          <Grid
            item
            lg={4}
            md={12}
            xl={6}
            xs={12}
          >
            <Board result = {history?.result} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TabChat roomId = {history?.roomId} />
          </Grid>
         
        </Grid>
      </Container>
    </Page>
  );
};

export  {MatchDetail};
