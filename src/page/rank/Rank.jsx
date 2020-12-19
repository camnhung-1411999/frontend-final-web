import React from 'react';
import {
    Container,
    Grid,
    makeStyles,
    Avatar
} from '@material-ui/core';
import { Page, } from '../../components';
import Paper from '@material-ui/core/Paper';
import CardPerson from './components/CardPerson';
import ListPerson from './components/ListPerson'
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    paper: {
        height: 240,
        width: 200,
        margin: '0 auto',
        border: "5px solid #eb77c8",
        '@media (max-width: 780px)' : {
            height: 140,
            width: 100,
            border: "3px solid #eb77c8"
          }
        
    },
    paper1: {
        height: 220,
        width: 200,
        margin: '0 auto',
        marginTop: 20, 
        border: "5px solid #4ad4e7",
        '@media (max-width: 780px)' : {
            height: 120,
            width: 100,
            border: "3px solid #4ad4e7",

          }
        
    },
    paper2: {
        height: 200,
        width: 200,
        margin: '0 auto',
        marginTop: 40 , 
        border: "5px solid #a287fc",
        '@media (max-width: 780px)' : {
            marginTop: 30 , 
            height: 110,
            width: 100,
            border: "3px solid #a287fc"
          }
        
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
}));

const Rank = () => {
    const classes = useStyles();

    return (
        <Page
            className={classes.root}
            title="Rank"
        >
            <Container maxWidth={false}>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        lg={6}
                        sm={12}
                        xl={12}
                        xs={12}
                        container
                        spacing={3}
                        style={{margin: "0 auto"}}
                    >
                        <Grid
                            item
                            lg={4}
                            sm={4}
                            xl={4}
                            xs={4}
                        >
                            <Paper className={classes.paper1}>
                                <CardPerson/>
                            </Paper>
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            sm={4}
                            xl={4}
                            xs={4}
                        >
                            <Paper className={classes.paper} style={{}} >
                                <CardPerson/>
                            </Paper>
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            sm={4}
                            xl={4}
                            xs={4}
                        >
                            <Paper className={classes.paper2} >
                                <CardPerson/>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        lg={12}
                        sm={12}
                        xl={12}
                        xs={12}
                    >
                       <ListPerson/>
                    </Grid>
                    
                </Grid>
            </Container>
        </Page>
    );
};

export { Rank };
