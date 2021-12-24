export default {
  namespaced: true,
  state() {
    return { login: false, alarm: false };
  },
  mutations: {
    changeModalState(state, { name, value }) {
      state[name] = value;
    },
  },
  actions: {
    onModal({ commit }, modal) {
      commit("changeModalState", { name: modal, value: true });
    },
    offModal({ commit }, modal) {
      commit("changeModalState", { name: modal, value: false });
    },
  },
};
