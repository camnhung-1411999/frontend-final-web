import React from "react";
import { Route, Redirect } from "react-router-dom";
import { userService } from "../services/index";
import { SnackBar } from "./";

function AdminRoute({ component: Component, ...rest }) {
  const user = async () => {
    const iuser = await userService.getCurrentUser();
    if (iuser && iuser.data?.role === "admin") {
      return iuser;
    }
    return undefined;
  };
  const admin = user();
  return (
    <Route
      {...rest}
      render={(props) =>
        admin ? (
          <>
            <SnackBar />
            <Component />
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

export { AdminRoute };
