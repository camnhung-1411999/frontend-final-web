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
      async (user) => {
        dispatch(success(user));
        await socket.emit('online');
        window.location.reload();
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
        window.location.reload();
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

async function logout(from ) {
  await UserService.logout().then(async (user)=>{
    await socket.emit('online');
    window.location.reload();
    history.push(from);
  });

  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    UserService.register(user).then(
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
  function success(user) {
    return { type: userConstants.USER_ONLINE, user };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
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
  function success(user) {
    return { type: userConstants.USER_OFFLINE, user };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
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

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
