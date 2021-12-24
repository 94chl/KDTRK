import {getUser,setUser} from "../storage/localStorage";
const API_END_POINT = "https://learn.programmers.co.kr";
const userAuth = async () => {
	const {token} = getUser() || null;
	if(!token) return;
	const result = await fetch(`${API_END_POINT}/auth-user`,{
		method : "GET",
		headers : {
			"Content-Type": "application/json",
			Authorization: `bearer ${token}`
		}
	}).then(res=>res.json());
	setUser({token, user : result});
	console.log(result.image);
	return result;
};

export default userAuth;
