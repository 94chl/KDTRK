import request from "~/api/api";

export default {
  namespaced: true,
  state: {
    comments: [],
  },
  mutations: {
    loadComments(state, comments) {
      state.comments = comments;
    },
    setComments(state, newComment) {
      state.comments.push(newComment);
    },
    removeComment(state, removedComment) {
      const newComments = state.comments.filter(
        (comment) => comment._id !== removedComment._id
      );
      state.comments = newComments;
    },
  },
  actions: {
    async newComment({ commit }, commentInfo) {
      const result = await request("/comments/create", {
        headers: {
          Authorization: `bearer ${commentInfo.token}`,
        },
        method: "POST",
        body: JSON.stringify({
          comment: commentInfo.comment,
          postId: commentInfo.postId,
        }),
      });
      if (!result && window.confirm("로그인이 필요한 서비스입니다")) {
        history.go(0);
      } else {
        commit("setComments", result);
      }
    },
    async removeComment({ commit }, commentInfo) {
      const result = await request("/comments/delete", {
        headers: {
          Authorization: `bearer ${commentInfo.token}`,
        },
        method: "DELETE",
        body: JSON.stringify({
          id: commentInfo.commentId,
        }),
      });

      if (!result && window.confirm("삭제 권한이 없습니다")) {
        history.go(0);
      } else {
        commit("removeComment", result);
      }
    },
  },
};
