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
    // minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    backgroundImage: 'url("https://cdn.gamedevmarket.net/wp-content/uploads/20191203165317/8657cfcd9a0aa1149a40988c4686478c.png")'
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
