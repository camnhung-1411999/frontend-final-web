import { userConstants } from "../constants";
import { userService } from "../services";
import { alertActions } from ".";
import { history, socket } from "../helpers";

export const userActions = {
  login,
  loginSocial,
  logout,
  register,
  getUserOnline,
  delete: _delete,
  userOnline,
  profile,
  update,
  userOffline,
};

function login(data, from) {
  return async (dispatch) => {
    dispatch(request({ username: data.user }));

    await userService.login(data).then(
      (user) => {
        if (user.role === "admin") {
          dispatch(success(user));
          dispatch(alertActions.clear());
          history.push(`/adminboard`);
        } else {
          dispatch(success(user));
          socket.emit("online", {
            body: { username: user.user, name: user.name, image: user.image },
            senderId: socket.id,
          });
          dispatch(alertActions.clear());
          history.push(from);
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        if (error.response?.status === 404) {
          dispatch(alertActions.error("User not found!!!"));
        } else {
          dispatch(alertActions.error("Password not match!!!"));
        }
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }

  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }

  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function loginSocial(data, from) {
  return async (dispatch) => {
    dispatch(request({ username: data.user }));
    await userService.loginSocial(data).then(
      async (user) => {
        dispatch(success(user));
        await socket.emit("online");
        history.push(from);
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }

  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }

  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout(from) {
  return async (dispatch) => {
    await userService.logout().then(async (reponsive) => {
      const user = reponsive.data;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      history.push(from);
      socket.emit("offline", {
        body: { username: user.user, name: user.name },
        senderId: socket.id,
      });


    });
  };
}

function register(iuser) {
  return (dispatch) => {
    dispatch(request(iuser));

    userService.register(iuser).then(
      (user) => {
        dispatch(success());
        history.push("/login");
        dispatch(alertActions.success("Registration successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        if (error.response.status === 409) {
        dispatch(alertActions.error("Email existed !!!"));
        } else {
          dispatch(alertActions.error("Registration failed !!!"));
        }
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }

  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }

  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function profile() {
  return async (dispatch) => {
    dispatch(request());
    await userService.getCurrentUser().then(
      (user) => dispatch(success(user.data)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.PROFILE_REQUEST };
  }

  function success(user) {
    return { type: userConstants.PROFILE_SUCCESS, user };
  }

  function failure(error) {
    return { type: userConstants.PROFILE_FAILURE, error };
  }
}


function getUserOnline() {
  return (dispatch) => {
    dispatch(request());

    userService.getUserOnline().then(
      (users) => dispatch(success(users.data)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }

  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }

  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

function userOnline(iuser) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(iuser));
  };

  function request() {
    return { type: userConstants.USER_ONLINE_REQUEST };
  }

  function success(user) {
    return { type: userConstants.USER_ONLINE, user };
  }
}

function userOffline(iuser) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(iuser));
  };

  function request() {
    return { type: userConstants.USER_OFF_REQUEST };
  }

  function success(user) {
    return { type: userConstants.USER_OFFLINE, user };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id).then(
      (user) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(_id) {
    return { type: userConstants.DELETE_REQUEST, _id };
  }

  function success(_id) {
    return { type: userConstants.DELETE_SUCCESS, _id };
  }

  function failure(_id, error) {
    return { type: userConstants.DELETE_FAILURE, _id, error };
  }
}

function update(data) {
  return (dispatch) => {
    dispatch(request());
    userService.update(data).then(
      (user) => {
        dispatch(success(user.data));
        dispatch(alertActions.success("Update success."));
      },
      (error) => {
        // dispatch(failure(error.toString()));
        dispatch(alertActions.error("Update failed."));
      }
    );
  };

  function request() {
    return { type: userConstants.UPDATE_REQUEST };
  }

  function success(user) {
    return { type: userConstants.UPDATE_SUCCESS, user };
  }

  function failure(error) {
    return { type: userConstants.UPDATE_FAILURE, error };
  }
}
