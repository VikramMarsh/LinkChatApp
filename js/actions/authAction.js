import {SET_CURRENT_USER} from './actionTypes';
import {LOGOUT_USER} from './actionTypes';

export function setCurrentUser(userInfo) {
		return{
			type:SET_CURRENT_USER,
			userInfo
		}
}

export function logout() {
	return dispatch=>{
			localStorage.removeItem('jwtToken');
			dispatch(setCurrentUser({}));
			return Promise.resolve();	
	}
}
