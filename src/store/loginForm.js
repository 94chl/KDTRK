export default {
	namespaced: true,
	state(){
		return {isShowLoginForm : false,};
	},
	mutations : {
		setIsShowLoginForm(state,value){
			state.isShowLoginForm = value;
		}
	},
	actions : {
		onLoginForm({commit}){
			commit("setIsShowLoginForm",true);
		},
		offLoginForm({commit}){
			commit("setIsShowLoginForm",false);
		}
	}
};