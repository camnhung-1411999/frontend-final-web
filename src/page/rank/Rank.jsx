import React from "react";
import { Container, Grid, makeStyles, Avatar } from "@material-ui/core";
import { Breadcrumb, Page } from "../../components";
import Paper from "@material-ui/core/Paper";
import CardPerson from "./components/CardPerson";
import ListPerson from "./components/ListPerson";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  paper: {
    height: 240,
    width: 200,
    margin: "0 auto",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    "@media (max-width: 780px)": {
      height: 140,
      width: 100,
      // border: "3px solid #eb77c8"
    },
  },
  paper1: {
    height: 220,
    width: 200,
    margin: "0 auto",
    marginTop: 20,
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
    color: "white",
    "@media (max-width: 780px)": {
      height: 120,
      width: 100,
      // border: "3px solid #4ad4e7",
    },
  },
  paper2: {
    height: 200,
    width: 200,
    margin: "0 auto",
    marginTop: 30,
    background: "linear-gradient(45deg, #008793 30%, #00bf72 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(0, 191, 114, .3)",
    color: "white",
    "@media (max-width: 780px)": {
      marginTop: 30,
      height: 110,
      width: 100,
      // border: "3px solid #a287fc"
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Rank = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Rank">
      <Breadcrumb
        name="Rank"
        style={{
          marginLeft: "10px",
          marginBottom: "10px",
          width: "fit-content",
          padding: "10px",
        }}
      />
      <Container maxWidth={false}>
        <Grid container spacing={2}>
          <Grid
            item
            lg={6}
            sm={12}
            xl={6}
            xs={12}
            container
            spacing={3}
            style={{ margin: "0 auto" }}
          >
            <Grid item lg={4} sm={4} xl={4} xs={4}>
              <Paper className={classes.paper1}>
                <CardPerson styleCss={classes.paper1} />
              </Paper>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4}>
              <Paper className={classes.paper}>
                <CardPerson styleCss={classes.paper} />
              </Paper>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4}>
              <Paper className={classes.paper2}>
                <CardPerson styleCss={classes.paper2} />
              </Paper>
            </Grid>
          </Grid>

          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <ListPerson />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export { Rank };
