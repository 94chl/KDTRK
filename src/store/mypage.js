import request from "~/api/api";
import { getUser } from "~/storage/localStorage";

export default {
  namespaced: true,
  state() {
    return {
      userId: "",
      userInfo: {},
      posts: [],
      likedPosts: [],
      userFollowers: [],
      userFollowings: [],
    };
  },
  mutations: {
    updateUserId(state, newUserId) {
      state.userId = newUserId;
    },
    updateUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo;
    },
    updatePosts(state, newPosts) {
      state.posts = newPosts;
    },
    updateLikedPosts(state, newPosts) {
      state.likedPosts = newPosts;
    },
    updateUserFollowers(state, newFollowers) {
      state.userFollowers = newFollowers;
    },
    updateUserFollowings(state, newFollowings) {
      state.userFollowings = newFollowings;
    },
    removeUserFollowings(state, removedFollowing) {
      const newFollowings = state.userFollowings.filter(
        (following) => following.followingId !== removedFollowing
      );
      state.userFollowings = newFollowings;
    },
  },
  actions: {
    async getUserInfo({ state, commit }) {
      const result = await request(`/users/${state.userId}`);

      commit("updateUserInfo", result);
    },
    async getUserPosts({ state, commit }) {
      const result = await request(`/posts/author/${state.userId}`);

      commit("updatePosts", result);
    },
    async getUserLikes({ state, commit }) {
      const result = await Promise.all(
        state.userInfo.likes.map(async (like) => {
          const post = await request(`/posts/${like.post}`);
          return post;
        })
      );

      commit("updateLikedPosts", result);
    },
    async getUserFollowers({ state, commit }) {
      const result = await Promise.all(
        state.userInfo.followers.map(async (user) => {
          const followers = await request(`/users/${user.follower}`);
          const result = {
            ...JSON.parse(followers.fullName),
            createdAt: user.createdAt.slice(0, 10),
            image: user.image || null,
            _id: user.follower,
          };
          return result;
        })
      );
      commit("updateUserFollowers", result);
    },
    async getUserFollowings({ state, commit }) {
      const result = await Promise.all(
        state.userInfo.following.map(async (user) => {
          const following = await request(`/users/${user.user}`);
          const result = {
            ...JSON.parse(following.fullName),
            createdAt: user.createdAt.slice(0, 10),
            image: user.image || null,
            _id: user.user,
            followingId: user._id,
          };
          return result;
        })
      );
      commit("updateUserFollowings", result);
    },
    async unFollow({ commit }, followId) {
      const { token } = getUser() || null;
      if (!token) return;
      const result = await request("/follow/delete", {
        method: "DELETE",
        headers: {
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          id: followId,
        }),
      });
      commit("removeUserFollowings", result._id);
    },
  },
};
