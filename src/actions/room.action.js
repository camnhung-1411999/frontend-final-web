import { roomConstants } from "../constants/room.constant";
import RoomService from "../services/room.service";
import { alertActions } from "./";
import { history } from "../helpers";

export const roomActions = {
    create,
    listRooms,
};

function create(from) {
  return (dispatch) => {
    dispatch(request());

    RoomService.createRoom().then(
      (room) => {
        dispatch(success(room));
        window.location.reload();
        history.push(from);
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
          dispatch(success(rooms));
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
}
