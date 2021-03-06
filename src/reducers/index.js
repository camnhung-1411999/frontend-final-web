import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { rooms } from './room.reducer';
import { alert } from './alert.reducer';
import { ranks } from './rank.reducer';
import { games } from './game.reducer';


const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    rooms,
    ranks,
    alert,
    games
});

export default rootReducer;