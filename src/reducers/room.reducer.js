import { roomConstants } from '../constants';

export default function rooms(state = {}, action) {
    switch (action.type) {
        case roomConstants.CREATE_REQUEST:
            return {
                loading: true,
            };
        case roomConstants.CREATE_SUCCESS:
            return {
                item: action.room,
            };
        case roomConstants.CREATE_FAILURE:
            // add 'deleting:true' property to user being deleted
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
            };
        case roomConstants.GET_FAILURE:
            // add 'deleting:true' property to user being deleted
            return {
                error: action.error
            };
        default:
            return state
    }
}