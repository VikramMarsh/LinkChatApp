
import {CONNECTED_USERS} from './actionTypes';


export function connectedUsers(userlist) {
	return{
		type:CONNECTED_USERS,
		userlist
	}
}
