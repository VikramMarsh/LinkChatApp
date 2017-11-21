export default function setHeaders(headers) {
	if(localStorage.jwtToken){
		return{
			...headers,
			'Authorization':'Bearer '+localStorage.jwtToken
		}
	}
		else
			return headers;
}