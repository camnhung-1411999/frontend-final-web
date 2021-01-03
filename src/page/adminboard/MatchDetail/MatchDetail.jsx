import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import {Page} from '../../../components';
import {Game, TabChat, Player} from './components';



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const MatchDetail = () => {
  const classes = useStyles();
  const mock = [{
    isExact:true,
    params :{id:"1010"},
    path: "/board/:id",
    url: "/board/1011",
  }]
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
            <Player/>
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
            <TabChat id={1} />
          </Grid>
         
        </Grid>
      </Container>
    </Page>
  );
};

export  {MatchDetail};
