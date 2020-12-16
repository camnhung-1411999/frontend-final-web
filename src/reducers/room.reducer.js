import { roomConstants } from '../constants';

export default function rooms(state = {}, action) {
    switch (action.type) {
        case roomConstants.CREATE_REQUEST:
            return {
                loading: true,
            };
        case roomConstants.CREATE_SUCCESS:
            return {
                squares: Array(9*9).fill(null),
            };
        case roomConstants.CREATE_FAILURE:
            // add 'deleting:true' property to user being deleted
            return {
                error: action.error
            };
        case roomConstants.UPDATE_REQUEST:
            return {
                loading: true,
            };
        case roomConstants.UPDATE_SUCCESS:
            return {
                squares: state.squares.map((item,index) =>
                    index === action.index
                        ? action.chessman
                        : index
                )
            }; 
        case roomConstants.UPDATE_FAILURE:
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
        case roomConstants.MESSAGE_REQUEST:
            return {
                loading: true,
            };
        case roomConstants.MESSAGE_SUCCESS:
            return {
                msgs: action.messages,
            };
        case roomConstants.MESSAGE_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}