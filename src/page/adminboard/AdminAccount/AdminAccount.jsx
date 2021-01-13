import React, { useEffect } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { Page } from "../../../components";
import { Profile, ProfileDetails, Password } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../actions";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const AdminAccount = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.iprofile);
  useEffect(() => {
    dispatch(userActions.profile());
  }, [user]);
  return (
    <Page className={classes.root} title="Profile">
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
            <Password />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export { AdminAccount };
