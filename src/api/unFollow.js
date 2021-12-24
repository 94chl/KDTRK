import {getUser} from "../storage/localStorage";
const API_END_POINT = "https://learn.programmers.co.kr";
const unFollow = async (id) => {
	const {token} = getUser() || null;
	if(!token) return;
	const result = await fetch(`${API_END_POINT}/follow/delete`,{
		method : "DELETE",
		headers : {
			"Content-Type": "application/json",
			Authorization: `bearer ${token}`
		},
		body : JSON.stringify({
			id
		})
	}).then(res=>res.json());
  return result;
};

export default unFollow;