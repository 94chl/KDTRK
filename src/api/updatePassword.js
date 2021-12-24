import {getUser} from "../storage/localStorage";
const API_END_POINT = "https://learn.programmers.co.kr";
const updateUser = async (password) => {
	const {token} = getUser() || null;
	if(!token) return;
	await fetch(`${API_END_POINT}/settings/update-password`,{
		method : "PUT",
		headers : {
			"Content-Type": "application/json",
			Authorization: `bearer ${token}`
		},
		body : JSON.stringify({
			password
		})
	});
};

export default updateUser;