import {NEW_MESSAGE} from './../actions/actionTypes';
import {GET_MESSAGE} from './../actions/actionTypes';

export default (state=[],action={})=>{
	
	switch(action.type){

		case NEW_MESSAGE:	
			return [...state,{to:action.payload.to,
				from:action.payload.from,
				message:action.payload.message,
				time:action.payload.time,
				date:action.payload.date,
				baseDate:action.payload.baseDate}
				]
		case GET_MESSAGE:
			return action.payload
		default: 
			return state;
	}
}
