import axios from "axios";
import request from "~/api/api";
import { setPost } from "~/storage/localStorage";
import { getUser } from "../storage/localStorage";

// TODO 상수 파일에서 관리
const LIMIT = 10;

export default {
  namespaced: true,
  state() {
    return {
      post: {},
      posts: [],
      clickedPost: {},
      offset: 0,
      isPostEnd: false,
      isFollowed: false,
    };
  },
  getters: {},
  mutations: {
    setIsFollowed(state) {
      if (!Object.keys(state.post).length) return;
      const user = getUser().user;
      const follow = user.following.filter(
        (item) => item.user === state.post.author._id
      );
      if (follow.length > 0) {
        state.isFollowed = true;
      } else {
        state.isFollowed = false;
      }
    },
    assignState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
    updateOffset(state) {
      state.offset = state.offset + LIMIT;
    },
    updateClickedPost(state, postId) {
      state.clickedPost = state.posts.filter((post) => post._id === postId);
    },
  },
  actions: {
    updateIsFollowed({ commit }) {
      commit("setIsFollowed");
    },
    async createPost({ dispatch, commit }, formData) {
      let token = localStorage.getItem("token");
      const result = await axios.post(
        "https://learn.programmers.co.kr/posts/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      commit("assignState", {
        posts,
      });
    },

    async loadMore({ state, commit }) {
      const nextPosts = await fetch(
        `https://learn.programmers.co.kr/posts/channel/6182ac41e1ecd063dabf10e0?offset=${state.offset}&limit=${LIMIT}`,
        {
          method: "GET",
        }
      ).then((res) => res.json());
      if (nextPosts.length < LIMIT) {
        commit("assignState", {
          isPostEnd: true,
        });
      }

      commit("assignState", {
        posts: [...state.posts, ...nextPosts],
      });
    },
    async readPost({ commit }, postId) {
      const post = await fetch(
        `https://learn.programmers.co.kr/posts/${postId}`,
        {
          method: "GET",
        }
      ).then((res) => res.json());


      commit("assignState", {
        post,
      });
    },
    async readPosts({ commit }) {
      // FIXME limit파라미터 상수로 관리
      const posts = await fetch(
        `https://learn.programmers.co.kr/posts/channel/6182ac41e1ecd063dabf10e0?limit=${LIMIT}`,
        {
          method: "GET",
        }
      ).then((res) => res.json());

      console.log(posts);
      commit("assignState", {
        posts,
      });
    },
    async getPostInfo({ commit }, postId) {
      const post = await request(`/posts/${postId}`);

      commit("assignState", {
        post,
      });
      setPost(post);
    },
    async deletePost({ dispatch }, postId) {
      let token = localStorage.getItem("token");

      await fetch("https://learn.programmers.co.kr/posts/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          id: postId,
        }),
      }).then((res) => res.json());

      dispatch("readPosts");
    },
    async updatePost({ dispatch }, formData) {
      let token = localStorage.getItem("token");
      const result = await axios.put(
        "https://learn.programmers.co.kr/posts/update",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      dispatch("readPosts");
    },
  },
};
