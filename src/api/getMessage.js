import {getUser} from "../storage/localStorage";
const API_END_POINT = "https://learn.programmers.co.kr";
const getuserList = async () => {
	const {token} = getUser() || null;
	if(!token) return;
	const result = await fetch(`${API_END_POINT}/messages/conversations`,{
		headers : {
			Authorization: `bearer ${token}`
		}
	}).then(res=>res.json());
	return result;
};

export default getuserList;