const API_END_POINT = "https://learn.programmers.co.kr";

const requestSignup = async ({email,fullName,password})=> {
	const result = await fetch(`${API_END_POINT}/signup`,{
		headers: {
			"Content-Type": "application/json"
		},
		method : "POST",
		body : JSON.stringify({
			email,
			fullName,
			password
		})
	}).then(res=>res.json());
	return result;
};

export default requestSignup;