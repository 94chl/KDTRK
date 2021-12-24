// import * as Vue from 'vue'
import { createApp } from "vue";
import App from "~/App";

import store from "~/store/index.js"; // NOTE "/index.js" 생략 가능
import router from "~/routes/index.js";
import Posts from "~/components/Posts";
import GoMainBtn from "~/components/GoMainBtn";
import '~/routes/guard'

// Vue.createApp(App).mount('#app')
const app = createApp(App);

// NOTE app애플리케이션에 store플러그인을 등록

app.use(store);
app.use(router);

// NOTE 컴포넌트 전역등록
app.component("Posts", Posts);
app.component("GoMainBtn", GoMainBtn);


// NOTE index.html의 #app에 연결
app.mount("#App");
