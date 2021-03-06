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
                items: state.items,
            };
        case roomConstants.ROOM_PUBLIC_FAILURE:
            return {
                error: action.error,
                items: state.items
            };
        case roomConstants.ROOM_NEW_REQUEST:
            return {
                loading: true,
            };
        case roomConstants.ROOM_NEW_SUCCESS: {
            if(state.items) {
                return {
                    ...state,
                    items: [
                        ...state.items, action.room
                    ]
                };
            }else{
                return state
            }
        }
        default:
            return state
    }
}