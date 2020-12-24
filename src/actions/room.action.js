import { roomConstants } from "../constants/room.constant";
import RoomService from "../services/room.service";
import { alertActions } from "./";
import { history, socket } from "../helpers";


export const roomActions = {
  create,
  listRooms,
  listMsg,
  joinRoom,
  getRoom
};

function create(checked, password) {
  return (dispatch) => {
    dispatch(request());

    const data = { public: checked, password: password }

    RoomService.createRoom(checked, password).then(
      async (room) => {
        dispatch(success(room));
        await socket.emit('joinRoom', room.data.idroom)
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

function joinRoom(id) {
  return (dispatch) => {
    dispatch(request());

    RoomService.joinRoom(id).then(
      async (room) => {
        dispatch(success(room));
        await socket.emit('joinRoom', id)
        history.push(`/board/${id}`);
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

function listRooms() {
  return (dispatch) => {
    dispatch(request());

    RoomService.listRoom().then(
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

function getRoom(id, rooms) {
  return (dispatch) => {
    RoomService.getRoom(id).then(
      async (response) => {
        const room = response.data;
        if (room.public == "true") {
          dispatch(success(true, rooms));
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
  function success(isPublic, rooms) {
    return { type: roomConstants.ROOM_PUBLIC_SUCCESS, isPublic, rooms };
  }
  function failure(error, rooms) {
    return { type: roomConstants.ROOM_PUBLIC_FAILURE, error, rooms };
  }
}


function listMsg(arr) {
  return (dispatch) => {
    dispatch(success(arr))
  };

  function success(messages) {
    return { type: roomConstants.GET_SUCCESS, messages };
  }

}
