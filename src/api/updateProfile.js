import {getUser} from "../storage/localStorage";
const API_END_POINT = "https://learn.programmers.co.kr";
const updateProfile = (img) => {
	const {token} = getUser() || null;
	if(!token) return;
	fetch(`${API_END_POINT}/users/upload-photo`,{
    method: 'post',
		headers : {
			Authorization: `bearer ${token}`
		},
		body : img
	})
};

export default updateProfile;