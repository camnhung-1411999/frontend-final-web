import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../services/user.service";
import {Header} from "./Header";


function PrivateRoute({ component: Component, ...rest }) {
  const auth = Auth.getCurrentUser();
  return (
    <Route
      {...rest}
      render={props =>
        auth ? (
          <>
            <Header /> 
            <Component {...props} />
          </>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { referer: props.location } }}
          />
        )
      }
    />
  );
}

function NormalRoute({ component: Component, ...rest }) {
  const auth = Auth.getCurrentUser();
  return (
    <Route
      {...rest}
      render={props =>
        !auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/home", state: { referer: props.location } }}
          />
        )
      }
    />
  );
}

export { PrivateRoute, NormalRoute};