import { rankConstants } from '../constants';

export function ranks(state = {}, action) {
    switch (action.type) {
        case rankConstants.GETALL_REQUEST:
            return {
                loading: true,
            };
        case rankConstants.GETALL_SUCCESS:
            return {
                items: action.items
            };
        case rankConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}