import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, makeStyles } from "@material-ui/core";
import {  Page } from "../../../components";
import { Profile, ProfileDetails, MatchHistory } from "./components";
import { userService } from "../../../services/index";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const UserDetail = () => {
  const classes = useStyles();
  const id = useParams().id;

  return (
    <Page className={classes.root} title="Profile">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Profile id ={id}/>
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails id ={id}/>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}></Grid>
          <Grid item lg={8} md={6} xs={12}>
            <MatchHistory />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export { UserDetail };
