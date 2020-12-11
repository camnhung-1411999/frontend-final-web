import "./App.css";
import Home from "./page/Login_Signup/Home";
import Admin from "./page/Admin/Admin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Profile from "./page/Profile";
import {DashBoard} from "./page/DashBoard";
import {PrivateRoute, NormalRoute} from './components';
import React from "react";
import PageNotFound from "./page/PageNotFound";

function App() {
  
  return (
      <Router>
        <div className="App">
            <Switch>
              <NormalRoute exact path="/" component={Home} />
              <NormalRoute path="/login" component={Home} />
              <NormalRoute path="/signup" component={Home} />
              <NormalRoute path="/admin" component={Admin} />
              <PrivateRoute path="/home" component={DashBoard} />
              

              {/* <PrivateRoute path="/profile" component={Profile} /> */}

              <Route path="/404" component={PageNotFound} />
              {/* <Redirect from='*' to='/404' /> */}
            </Switch>
        </div>
      </Router>
  );
}

export default App;
