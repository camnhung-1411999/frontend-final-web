import {userConstants} from '../constants';

export function users(state = {}, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case userConstants.GETALL_SUCCESS:
            return {
                items: action.users
            };
        case userConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        case userConstants.PROFILE_REQUEST:
            return {
                loading: true
            };
        case userConstants.PROFILE_SUCCESS:
            return {
                profile: action.user,
                items: state.items,
            };
        case userConstants.PROFILE_FAILURE:
            return {
                error: action.error
            };

        case userConstants.UPDATE_REQUEST:
            return {
                loading: true
            };
        case userConstants.UPDATE_SUCCESS:
            return {
                iprofile: action.user
            };
        case userConstants.UPDATE_FAILURE:
            return {
                error: action.error
            };

        case userConstants.USER_ONLINE: {
            if (state.items)
                return {
                    ...state,
                    items: [
                        ...state.items, action.user
                    ]
                };
            else return state;
        }
        case userConstants.USER_OFFLINE: {
            if (state.items)
                return {
                    items: state.items.filter(user => user.username !== action.user.username)
                };
            else
                return state;
        }
        case userConstants.DELETE_REQUEST:
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? {...user, deleting: true}
                        : user
                )
            };
        case userConstants.DELETE_SUCCESS:
            return {
                items: state.items.filter(user => user.id !== action.id)
            };
        case userConstants.DELETE_FAILURE:
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                        const {deleting, ...userCopy} = user;
                        return {...userCopy, deleteError: action.error};
                    }

                    return user;
                })
            };
        default:
            return state
    }
}