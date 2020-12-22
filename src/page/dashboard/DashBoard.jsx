import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import {Page, Online} from '../../components';
import Rooms from './components/Rooms';


const useStyles = makeStyles((theme) => ({
  dashboard: {
    backgroundColor: theme.palette.background.dark,
    // minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const DashBoard = (props) => {
  const classes = useStyles();
  return (
    <Page
      className={classes.dashboard}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={10}
            md={12}
            xl={10}
            xs={12}
          >
            <Rooms />
          </Grid>
          <Grid
            item
            lg={2}
            md={6}
            xl={2}
            xs={12}
          >
            <Online />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export  {DashBoard};
