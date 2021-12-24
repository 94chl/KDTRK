import { createRouter, createWebHistory } from "vue-router";

import Main from "./Main";
import Search from "./Search";
import Signup from "./Signup";
import Message from "./Message";
import UpdateUser from "./UpdateUser";
import Post from "./Post";
import NewPost from "./NewPost";
import UpdatePost from "./UpdatePost";
import NotFound from "./NotFound";
import Mypage from "./Mypage";

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    // name은 선택사항
    { path: "/", component: Main, name: "main" },
    { path: "/search", component: Search, name: "search" },
    { path: "/signup", component: Signup, name: "signup" },
    { path: "/message", component: Message, name: "message" },
    { path: "/updateUser", component: UpdateUser, name: "updateUser" },
    { path: "/post/:id", component: Post, name: "post" },
    { path: "/newPost", component: NewPost, name: "newPost" },
    { path: "/updatePost/:id", component: UpdatePost, name: "updatePost" },
    { path: "/:notfound(.*)", component: NotFound, name: "notFound" },
    { path: "/mypage", component: Mypage, name: "mypage" },
  ],
});
