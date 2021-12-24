export default {
  namespaced: true,
  state() {
    return {
      isShowLetter: false,
      receiver: "",
    };
  },
  mutations: {
    setIsShowLetter(state, value) {
      state.isShowLetter = value;
    },
    setReceiver(state, user) {
      state.receiver = user;
    },
  },
  actions: {
    onLetter({ commit }) {
      commit("setIsShowLetter", true);
    },
    offLetter({ commit }) {
      commit("setIsShowLetter", false);
    },
    changeReceiver({commit},newReceiver){
      commit("setReceiver", newReceiver);
    }
  },
};
