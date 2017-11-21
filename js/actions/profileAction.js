import setHeaders from './../../utils/authorizationHeader';

export function loadProfile(profileData) {
	return dispatch=>{
		return fetch('/api/profile/load',{
			method: 'post',  
			headers: setHeaders({  
				'Content-Type': 'application/json' 
			}),
			body: JSON.stringify(profileData)
		})
	}
}

export function profileUpdate(profileDetails) {
	return dispatch=>{
		return fetch('/api/profile/update',{
			method: 'post',  
			headers: setHeaders({  
				'Content-Type': 'application/json' 
			}),
			body: JSON.stringify(profileDetails)
		});
	}
}