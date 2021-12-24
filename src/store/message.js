import getUserList from "../api/getuserList";
import getMessageDetail from "../api/getMessageDetail";
import readMessage from "../api/readMessage";
import getNotification from "../api/getNotification";
export default {
	namespaced: true,
	state(){
		return {
			userList : [],
			messageList : [],
			sender : "",
			isShowMessageDetail : false,
			senderId : ""
		};
	},
	mutations : {
		setUserList(state,value){
			state.userList = value;
		},
		setMessageList(state,value){
			state.messageList = value;
		},
		setIsShowMessageDetail(state,value){
			state.isShowMessageDetail = value;
		},
		setSender(state,value){
			state.sender =value;
		}
	},
	actions : {
		async updateUserList({commit}){
			const userList = await getUserList();
			commit("setUserList",userList);
		},
		async updateMessageList({commit},id){
			await readMessage(id);
			const messageList = await getMessageDetail(id);
			commit("setSender",id);
			commit("setMessageList",messageList);
		},
		onMessageDetail({commit}){
			commit("setIsShowMessageDetail",true);
		},
		offMessageDetail({commit}){
			commit("setIsShowMessageDetail",false);
		},
		getAlarm(){
			getNotification()
		}
	}
};