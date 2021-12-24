<template>
  <div class="app__main">
    <Login />
    <PostSearch />
    <div class="main__contents">
      <div class="contents-title">포스트 목록</div>
      <Posts />
    </div>
  </div>
</template>

<script>
  import PostSearch from "../components/PostSearch.vue";
  import Login from "~/components/Login";
  import Posts from "~/components/Posts";

  export default {
    components: {
      PostSearch,
      Login,
      Posts,
    },
    computed: {
      posts() {
        return this.$store.state.posts.posts;
      },
    },
    mounted() {
      this.readPosts();
    },
    methods: {
      readPosts() {
        this.$store.dispatch("posts/readPosts");
      },
    },
  };
</script>

<style scoped lang="scss">
  .app__main {
    /*NOTE header높이 : 54px */
    /* height: calc(100vh - 54px); */
    display: flex;
    flex-direction: column;
    .main__contents {
      /*NOTE 150 = header(54) + search(54) */
      height: calc(100vh - 108px);
      display: flex;
      flex-direction: column;
      .contents-title {
        color: gray;
        font-size: 20px;
        line-height: 30px;
        padding: 14px 0;
      }
    }
  }
</style>