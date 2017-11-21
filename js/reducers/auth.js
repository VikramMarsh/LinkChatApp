import {SET_CURRENT_USER} from './../actions/actionTypes';
import {LOGOUT_USER} from './../actions/actionTypes';



import isEmpty from 'lodash/isEmpty';

const initialState={
	isAuthenticated:false,
	userInfo:{}
};

export default (state=initialState,action={})=>{
	switch(action.type){
		case SET_CURRENT_USER:
			return {
				isAuthenticated:!isEmpty(action.userInfo),
				userInfo:action.userInfo
			}
		default: return state;
	}
}



