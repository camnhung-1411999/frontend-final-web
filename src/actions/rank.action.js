import { rankConstants } from "../constants";
import { alertActions } from "./";
import { UserService } from "../services";

export const rankActions = {
  listRank,
};

function listRank() {
  return async (dispatch) => {
    dispatch(request());
    await UserService.getListRank().then(
      (response) => {
        dispatch(success(response.data));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    )
  };

  function request() {
    return { type: rankConstants.GETALL_REQUEST };
  }
  function success(items) {
    return { type: rankConstants.GETALL_SUCCESS, items };
  }
  function failure(error) {
    return { type: rankConstants.GETALL_FAILURE, error };
  }
}
