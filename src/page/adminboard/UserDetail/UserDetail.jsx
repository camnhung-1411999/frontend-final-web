import React, { useEffect } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { Breadcrumb, Page } from "../../../components";
import { Profile, ProfileDetails, MatchHistory } from "./components";
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
  return (
    <Page className={classes.root} title="Profile">
      <Breadcrumb
        name="Profile"
        style={{
          marginLeft: "10px",
          marginBottom: "10px",
          width: "fit-content",
          padding: "10px",
        }}
      />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Profile />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails />
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
