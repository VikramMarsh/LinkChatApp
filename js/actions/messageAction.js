import {NEW_MESSAGE} from './actionTypes';
import {GET_MESSAGE} from './actionTypes';
import setHeaders from './../../utils/authorizationHeader';

export function saveMessage(payload) {
		return{
			type:NEW_MESSAGE,
			payload
		}
}

export function saveGetMessages(payload) {
		return{
			type:GET_MESSAGE,
			payload
		}
}

export function createMessage(message) {

	return dispatch=>{
			fetch('/api/messages',{
				method: 'post',  
				headers: setHeaders({  
					'Content-Type': 'application/json' 
				}),
				body:JSON.stringify(message)
			}).then((response)=>{
				// dispatch(saveMessage(message));
				return response;
			});
		}
}

export function getMessages(email,to,from) {
		console.log(email+" "+to+" "+from)
	return dispatch=>{
			fetch('/api/getmessages',{
			method: 'post',  
			headers: setHeaders({  
				'Content-Type': 'application/json' 
			}),
			body:JSON.stringify({email:email,to:to,from:from})

		}).then((response)=>response.json())
					.then((data)=>{
						
						if(data.length==0)
						 dispatch(saveGetMessages(data));
						else
						 dispatch(saveGetMessages(data[0].messages));
					})
		}
}
