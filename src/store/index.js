import { createStore } from "vuex";

import modal from "./modal";
import loading from "./loading";
import posts from "./posts";
import postSearchStore from "./postSearchStore";
import letter from "./letter";
import message from "./message";
import comment from "./comment";
import like from "./like";
import mypage from "./mypage";

const store = createStore({
  modules: {
    loading,
    modal,
    posts,
    postSearchStore,
    letter,
    message,
    comment,
    like,
    mypage,
  },
});

export default store;
