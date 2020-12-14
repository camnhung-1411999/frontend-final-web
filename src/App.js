import "./App.css";
import Home from "./page/auth/Home";
import Admin from "./page/admin/Admin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Profile from "./page/Profile";
import {DashBoard} from "./page/dashboard";
import {PrivateRoute, NormalRoute} from './components';
import React from "react";
import PageNotFound from "./page/error/PageNotFound";
import {ChessBoard} from "./page/board";
import {Redirect} from "react-router-dom";
import {Account} from "./page/account"

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
              <PrivateRoute path="/room/:id" component={ChessBoard} />
              <PrivateRoute path="/profile" component={Account} />

              <Route path="/404" component={PageNotFound} />
              <Redirect from='*' to='/404' />
            </Switch>
        </div>
      </Router>
  );
}

export default App;
