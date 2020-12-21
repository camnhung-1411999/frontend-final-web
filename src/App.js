import "./App.css";
import Home from "./page/auth/Home";
import {Admin} from "./page/admin";
import { Router, Switch, Route } from "react-router-dom";
// import Profile from "./page/Profile";
import {DashBoard} from "./page/dashboard";
import {PrivateRoute, NormalRoute} from './components';
import React from "react";
import PageNotFound from "./page/error/PageNotFound";
import {ChessBoard} from "./page/board";
import {Redirect} from "react-router-dom";
import {Account} from "./page/account"
import {HistoryBoard} from "./page/historyboard";
import {Rank} from "./page/rank"
import { history } from './helpers';
import Confirm from './components/Confirm';
function App() {
  
  return (
      <Router history={history}>
        <div className="App">
            <Switch>
              <NormalRoute exact path="/" component={Home} />
              <NormalRoute path="/login" component={Home} />
              <NormalRoute path="/checkmail" component={Confirm} />
              <NormalRoute path="/signup" component={Home} />
              <PrivateRoute path="/admin" component={Admin} />
              <Route path="/rank" component={Rank} />
              <PrivateRoute path="/home" component={DashBoard} />
              <PrivateRoute path="/board/:id" component={ChessBoard} />
              <PrivateRoute path="/profile" component={Account} />
              <PrivateRoute path="/historyboard" component={HistoryBoard} />
              <Route path="/404" component={PageNotFound} />
              <Redirect from='*' to='/404' />
            </Switch>
        </div>
      </Router>
  );
}

export default App;
