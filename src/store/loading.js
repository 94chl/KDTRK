export default {
	namespaced: true,
	state(){
		return{
			isLoading : false
		};
	},
	mutations : {
		setIsLoading(state,value){
			state.isLoading = value;
		}
	},
	actions : {
		startLoading({commit}){
			commit("setIsLoading",true);
		},
		endLoading({commit}){
			commit("setIsLoading",false);
		}
	}
};