import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import {Page, Online} from '../../components';
import Board from './components/Board';
import Game from './components/Game';



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ChessBoard = () => {
  const classes = useStyles();

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
            {/* <TotalProfit /> */}
            Minh
          </Grid>
          <Grid
            item
            lg={4}
            md={12}
            xl={6}
            xs={12}
          >
            <Game />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            {/* <Online /> */}
            Minh
          </Grid>
         
        </Grid>
      </Container>
    </Page>
  );
};

export  {ChessBoard};
