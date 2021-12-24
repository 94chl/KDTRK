import {getUser} from "../storage/localStorage";
const API_END_POINT = "https://learn.programmers.co.kr";
const readMessage = async (id) => {
	const {token} = getUser() || null;
	if(!token) return;
	await fetch(`${API_END_POINT}/messages/update-seen`,{
		method : "PUT",
		headers : {
			"Content-Type": "application/json",
			Authorization: `bearer ${token}`
		},
		body : JSON.stringify({
			"sender": id
		})
	});
};

export default readMessage;