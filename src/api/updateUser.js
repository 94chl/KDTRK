import {getUser} from "../storage/localStorage";
const API_END_POINT = "https://learn.programmers.co.kr";
const updateUser = async ({username,fullName}) => {
	const payLoad = {
		fullName,
		username
	};
	const {token} = getUser() || null;
	if(!token) return;
	const result = await fetch(`${API_END_POINT}/settings/update-user`,{
		method : "PUT",
		headers : {
			"Content-Type": "application/json",
			Authorization: `bearer ${token}`
		},
		body : JSON.stringify(payLoad)
	}).then(res=>res.json());
	return result;
};

export default updateUser;