import request from "~/api/api";

export default {
  namespaced: true,
  state: {
    likes: [],
    likedUserInfo: [],
  },
  mutations: {
    loadLikes(state, likes) {
      state.likes = likes;
    },
    setLikedUserInfo(state, likedUserInfo) {
      state.likedUserInfo = likedUserInfo;
    },
    setLikes(state, newLike) {
      state.likes.push(newLike);
    },
    removeLike(state, removedLike) {
      const newLikes = state.likes.filter(
        (like) => like._id !== removedLike._id
      );
      state.likes = newLikes;
    },
  },
  actions: {
    async newLike({ commit }, likeInfo) {
      const result = await request("/likes/create", {
        headers: {
          Authorization: `bearer ${likeInfo.token}`,
        },
        method: "POST",
        body: JSON.stringify({
          postId: likeInfo.postId,
        }),
      });

      if (!result && window.confirm("로그인이 필요한 서비스입니다")) {
        history.go(0);
      } else {
        commit("setLikes", result);
      }
    },
    async removeLike({ commit }, likeInfo) {
      const result = await request("/likes/delete", {
        headers: {
          Authorization: `bearer ${likeInfo.token}`,
        },
        method: "DELETE",
        body: JSON.stringify({
          id: likeInfo.likedId,
        }),
      });

      if (!result && window.confirm("삭제 권한이 없습니다")) {
        history.go(0);
      } else {
        commit("removeLike", result);
      }
    },
    async getLikedUserInfo({ commit }, likedUsers) {
      const result = await Promise.all(
        likedUsers.map((userId) => {
          const userInfo = request(`/users/${userId}`);
          return userInfo;
        })
      );

      commit("setLikedUserInfo", result);
    },
  },
};
