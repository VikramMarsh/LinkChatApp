import {SET_CURRENT_SOCKET} from './../actions/actionTypes';


const initialState={
	username:''
}

export default (state=initialState,action={})=>{
	switch(action.type){
		case SET_CURRENT_SOCKET:
			return {
				username:action.user
			}
		default: 
			return state;
	}
}
