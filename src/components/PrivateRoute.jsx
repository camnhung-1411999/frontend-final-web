import React,{useEffect, useState} from "react";
import {Route, Redirect} from "react-router-dom";
import {userService} from "../services/index";
import {DialogInvite, Header, SnackBar} from "./";

function PrivateRoute({component: Component, ...rest}) {
    const auth = userService.getCurrentUser();

    return (
        <Route
            {...rest}
            render={(props) =>
                auth ? (
                    <>
                        <Header/>
                        <SnackBar/>
                        <DialogInvite />
                        <Component {...props} />
                    </>
                ) : (
                    <Redirect
                        to={{pathname: "/login", state: {referer: props.location}}}
                    />
                )
            }
        />
    );
}

function NormalRoute({component: Component, ...rest}) {
    const auth = userService.getCurrentUser();
    return (
        <Route
            {...rest}
            render={(props) =>
                !auth ? (
                    <>
                        <SnackBar/>
                        <Component {...props} />
                    </>
                ) : (
                    <Redirect
                        to={{pathname: "/home", state: {referer: props.location}}}
                    />
                )
            }
        />
    );
}

export {PrivateRoute, NormalRoute};
