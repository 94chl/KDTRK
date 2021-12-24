const API_END_POINT = "https://learn.programmers.co.kr";

const reqeustLogin = async ({email,password})=> {
	const result = await fetch(`${API_END_POINT}/login`,{
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({email,password})
	}).then(res=>res.json());
	return result;
};

export default reqeustLogin;