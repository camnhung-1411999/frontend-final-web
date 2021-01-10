import "./App.css";
import Home from "./page/auth/Home";
import {AdminBoard} from "./page/adminboard";
import { Router, Switch, Route } from "react-router-dom";
import {DashBoard} from "./page/dashboard";
import {PrivateRoute, NormalRoute, AdminRoute} from './components';
import React from "react";
import PageNotFound from "./page/error/PageNotFound";
import {ChessBoard} from "./page/board";
import {Redirect} from "react-router-dom";
import {Account} from "./page/account"
import {Rank} from "./page/rank"
import { history } from './helpers';
import Confirm from './components/Confirm';
import {ResetPassword} from './components/ResetPassword'
function App() {
  
  return (
      <Router history={history}>
        <div className="App">
            <Switch>
              <NormalRoute exact path="/" component={Home} />
              <NormalRoute path="/login" component={Home} />
              <NormalRoute path="/checkmail" component={Confirm} />
              <NormalRoute path="/resetpassword/:user" component={ResetPassword} />
              <NormalRoute path="/signup" component={Home} />
              <AdminRoute path="/adminboard" component={AdminBoard} />
              <PrivateRoute path="/rank" component={Rank} />
              <PrivateRoute path="/home" component={DashBoard} />
              <PrivateRoute path="/board/:id" component={ChessBoard} />
              <PrivateRoute path="/profile" component={Account} />
              <Route path="/404" component={PageNotFound} />
              <Redirect from='*' to='/404' />
            </Switch>
        </div>
      </Router>
  );
}

export default App;
