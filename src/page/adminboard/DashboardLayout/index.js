import React, { useState } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";	
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import routes from "../routes";	
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const switchRoutes = (	
  <Switch>	
    {routes.map((prop, key) => {	
      if (prop.layout === "/adminboard") {	
        return (	
          <Route	
            path={prop.layout + prop.path}	
            component={prop.component}	
            key={key}	
          />	
        );	
      }	
      return null;	
    })}	
    <Redirect from="/adminboard" to="/adminboard/list" />	
  </Switch>	
);	

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const getRoute = () => {	
    return window.location.pathname;	
  };	
	
  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
          {switchRoutes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
