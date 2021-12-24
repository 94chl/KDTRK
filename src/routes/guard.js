
import router from "./index.js";
import Store from "~/store";
import userAuth from "../api/userAuth";
import {removeStorage} from "../storage/localStorage";


router.beforeEach(async (to,from,next)=>{
	const readPosts = ()=> {
		Store.dispatch("posts/readPosts");
	}
	Store.dispatch("modal/offModal", "login");
	const isAuthenticated = await userAuth();
	if(to.name === "main"){
		setTimeout(readPosts,2000);
	}
	const isNeedAuth = to.name === "message" || to.name === "newPost" || to.name === "updateUser";
	if (isNeedAuth && !isAuthenticated) {
		next({ name : "main" });
		Store.dispatch("modal/onModal", "login");
		removeStorage(["token","user"]);
	}
	else next();
});

router.afterEach(async (to,from)=>{
	if(to.name === "post"){
		await userAuth();
		Store.dispatch("posts/updateIsFollowed");
	}
})