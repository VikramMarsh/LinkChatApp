

import {CONNECTED_USERS} from './../actions/actionTypes';

export default (state=[],action={})=>{
	switch(action.type){
		case CONNECTED_USERS:
			return action.userlist

		default:
			return state
	}
}