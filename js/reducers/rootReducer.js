import {combineReducers} from 'redux';

import auth from './auth';
import messages from './message';
import connectedUsers from './connectedUsers';

export default combineReducers({
	auth,
	messages,
	connectedUsers
});