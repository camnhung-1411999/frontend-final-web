import { roomConstants } from '../room';

export function rooms(state = {}, action) {
    switch (action.type) {
        case roomConstants.CREATE_REQUEST:
            return {
                items: action.room
            };
        case roomConstants.CREATE_SUCCESS:
            return {
                items: action.room
            };
        case roomConstants.CREATE_FAILURE:
            // add 'deleting:true' property to user being deleted
            return {
                error: action.error
            };
        default:
            return state
    }
}