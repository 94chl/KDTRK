import {getUser} from "../storage/localStorage";

const API_END_POINT = "https://learn.programmers.co.kr";
const sendAlarm = async ({userId,messageId}) => {
	const {token} = getUser() || null;
	if(!token) return;
	const result = await fetch(`${API_END_POINT}/notifications/create`,{
		method : "post",
		headers : {
			"Content-Type": "application/json",
			Authorization: `bearer ${token}`
		},
		body : JSON.stringify({
      "notificationType": "MESSAGE",
      "notificationTypeId": messageId,
      "userId": userId,
      "postId" : "61714781ad734869b8389f4e"
    })
	}).then(res=>res.json());
	return result;
};

export default sendAlarm;