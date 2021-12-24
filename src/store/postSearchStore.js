import request from "~/api/api";

export default {
  namespaced: true,
  state() {
    return {
      searchInput: {
        keyword: "",
        sort: "all",
      },
      fixedKeyword: [],
      searchResults: [],
      filter: [],
      filterOptions: ["과일", "채소", "계란", "요리", "잡화"],
    };
  },
  getters: {},
  mutations: {
    updateSearchInput(state, input) {
      state.searchInput = { ...state.searchInput, ...input };
    },
    updatefixedKeyword(state, input) {
      state.fixedKeyword = [...input];
    },
    toggleFilter(state, input) {
      state.filter.includes(input)
        ? state.filter.splice(state.filter.indexOf(input), 1)
        : state.filter.push(input);
    },
    updateSearchResults(state, result) {
      state.searchResults = JSON.parse(JSON.stringify(result));
    },
  },
  actions: {
    async search({ state, commit }) {
      let { keyword, sort } = state.searchInput;
      keyword = keyword.trim().includes(" ")
        ? keyword.trim().split(" ").join("+")
        : keyword.trim();

      const result = await request(`/search/${sort}/${keyword}`);
      await Promise.all(
        result.map(async (res) => {
          if (res.author) {
            const authorInfo = await request(`/users/${res.author}`);
            res.author = authorInfo;
          }
          return res;
        })
      );
      commit("updateSearchResults", result);
      commit("updatefixedKeyword", keyword.split("+"));
    },
  },
};
