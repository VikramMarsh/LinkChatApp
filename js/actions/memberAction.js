export function loadMembers() {
		return dispatch=>{
			return fetch('/api/member/getusers');
		}
}