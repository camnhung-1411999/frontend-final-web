import { roomConstants } from "../constants/room.constant";
import {roomService} from "../services";
import { alertActions } from "./";
import { history, socket } from "../helpers";
import {userConstants} from "../constants";


export const roomActions = {
  create,
  listRooms,
  joinRoom,
  getRoom,
  addRoom,

};

function create(checked, password) {
  return (dispatch) => {
    dispatch(request());

    roomService.createRoom(checked, password).then(
       (room) => {
        socket.emit('createRoom', room.data);
        history.push(`/board/${room.data.idroom}`);
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(room) {
    return { type: roomConstants.CREATE_REQUEST, room };
  }
  function success(room) {
    return { type: roomConstants.CREATE_SUCCESS, room };
  }
  function failure(error) {
    return { type: roomConstants.CREATE_FAILURE, error };
  }
}

function addRoom(room) {
  return (dispatch) => {
    dispatch(success(room));
  };

  function request() {
    return { type: roomConstants.ROOM_NEW_REQUEST };
  }
  function success(room) {
    return { type: roomConstants.ROOM_NEW_SUCCESS, room };
  }
}

function joinRoom(id, password) {
  return (dispatch) => {
    roomService.joinRoom(id, password).then(
      async () => {
        await socket.emit('joinRoom', id)
        history.push(`/board/${id}`);
      },
      (error) => {
        dispatch(alertActions.error("Password wrong"));
      }
    );
  };

  function request(room) {
    return { type: roomConstants.CREATE_REQUEST, room };
  }
  function success(room) {
    return { type: roomConstants.CREATE_SUCCESS, room };
  }
  function failure(error) {
    return { type: roomConstants.CREATE_FAILURE, error };
  }
}

function listRooms() {
  return (dispatch) => {
    dispatch(request());

    roomService.listRoom().then(
      (rooms) => {
        dispatch(success(rooms.data));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(rooms) {
    return { type: roomConstants.GET_REQUEST, rooms };
  }
  function success(rooms) {
    return { type: roomConstants.GET_SUCCESS, rooms };
  }
  function failure(errors) {
    return { type: roomConstants.GET_FAILURE, errors };
  }

};

function getRoom(id) {
  return (dispatch) => {
    roomService.getRoom(id).then(
      async (response) => {
        const room = response.data;
        if (room.public == "true") {
          dispatch(success(true));
        }
        else {
          await socket.emit('joinRoom', id)
          history.push(`/board/${id}`);
        }
      }
    ).catch(
      () => {
        dispatch(alertActions.error(`Room ${id} not found`));
      })
  };

  function request(id) {
    return { type: roomConstants.ROOM_PUBLIC_REQUEST, id };
  }
  function success(isPublic) {
    return { type: roomConstants.ROOM_PUBLIC_SUCCESS, isPublic };
  }
  function failure(error, rooms) {
    return { type: roomConstants.ROOM_PUBLIC_FAILURE, error, rooms };
  }
}

