import { roomConstants } from '../constants';

export function rooms(state = {}, action) {
    switch (action.type) {
        case roomConstants.CREATE_REQUEST:
            return {
                loading: true,
            };
        case roomConstants.CREATE_FAILURE:
            return {
                error: action.error
            };
        case roomConstants.GET_REQUEST:
            return {
                loading: true,
            };
        case roomConstants.GET_SUCCESS:
            return {
                items: action.rooms,
                isPublic: false,
            };
        case roomConstants.GET_FAILURE:
            return {
                error: action.error
            };
        case roomConstants.ROOM_PUBLIC_REQUEST:
            return {
                loading: true,
            };
        case roomConstants.ROOM_PUBLIC_SUCCESS:
            return {
                isPublic: action.isPublic,
                items: action.rooms,
            };
        case roomConstants.ROOM_PUBLIC_FAILURE:
            return {
                error: action.error,
                items: action.rooms
            };
        default:
            return state
    }
}