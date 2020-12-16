import { userConstants } from "../constants";
import { UserService } from "../services/index";
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
  userOffline
};

function login(data, from) {
  return async (dispatch) => {
    dispatch(request({ username: data.user }));

    await UserService.login(data).then(
      (user) => {
        dispatch(success(user));
        socket.emit('online', {
          body: ({ username: user.user, name: user.name }),
          senderId: socket.id,
        });
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

function loginSocial(data, from) {
  return async (dispatch) => {
    dispatch(request({ username: data.user }));
    await UserService.loginSocial(data).then(
      async (user) => {
        dispatch(success(user));
        await socket.emit('online');
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
    await UserService.logout().then(async (reponsive) => {
      const user = reponsive.data;
       socket.emit('offline', {
        body: ({ username: user.user, name: user.name }),
        senderId: socket.id,
      });
      history.push(from);
    });
  }
}

function register(iuser) {
  return (dispatch) => {
    dispatch(request(iuser));

    UserService.register(iuser).then(
      (user) => {
        dispatch(success());
        history.push("/login");
        dispatch(alertActions.success("Registration successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
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

function getUserOnline() {
  return (dispatch) => {
    dispatch(request());

    UserService.getUserOnline().then(
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

function userOnline(user) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(user));
  };

  function request() {
    return { type: userConstants.USER_ONLINE_REQUEST };
  }
  function success(iuser) {
    return { type: userConstants.USER_ONLINE, iuser };
  }

}
function userOffline(user) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(user))
  };

  function request() {
    return { type: userConstants.USER_OFF_REQUEST };
  }
  function success(iuser) {
    return { type: userConstants.USER_OFFLINE, iuser };
  }
}
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    UserService.delete(id).then(
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
