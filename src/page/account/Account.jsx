import React from "react";
import {Box,  Container, Grid, makeStyles } from "@material-ui/core";
import {Page} from "../../components";
import {Profile, ProfileDetails, Password} from "./components";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Account = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Account">
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
        <Grid item lg={4} md={6} xs={12}>
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
          <Password />
          </Grid>
        </Grid>
        {/* <Box mt={3}>
          <Password />
        </Box> */}
      </Container>
    </Page>
  );
};

export { Account };
