import {getUser} from "../storage/localStorage";
import sendAlarm from "./sendAlarm";
const API_END_POINT = "https://learn.programmers.co.kr";
const sendMessage = async ({message, receiver}) => {
	const {token} = getUser() || null;
	if(!token) return;
	const result = await fetch(`${API_END_POINT}/messages/create`,{
		method : "POST",
		headers : {
			"Content-Type": "application/json",
			Authorization: `bearer ${token}`
		},
		body : JSON.stringify({
			message,receiver
		})
	}).then(res=>res.json());
	sendAlarm({
		userId : receiver,
		messageId : result._id
	})
	return result;
};

export default sendMessage;