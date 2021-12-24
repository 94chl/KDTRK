<template>
  <!-- NOTE -->
  <div class="app__page">
    <Login />
    <Letter />
    <div class="page__inner">
      <div class="header">
        <Header />
      </div>

      <div class="main">
        <MessageDetail v-if="isShowMessageDetail" />
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "~/components/Header";
import Login from "~/components/Login";
import Letter from "~/components/Letter";
import MessageDetail from "~/components/MessageDetail";

export default {
  components: {
    Header,
    Login,
    Letter,
    MessageDetail,
  },
  computed: {
    isShowMessageDetail() {
      return this.$store.state.message.isShowMessageDetail;
    },
  },

  methods: {
    goNewPost() {
      this.$router.replace({ name: "newPost" });
    },
  },
};
</script>

<style lang="scss">
@use "~/scss/button";
@use "~/scss/color";
@use "~/scss/font";

.app__page {
  background: color.$egg-white;
  min-height: 100vh;
  height: 100%;

  * {
    @include font.small;
    font-family: "Noto Sans KR", sans-serif;
    box-sizing: border-box;
    &.fas,
    &.far {
      font-family: "Font Awesome 6 Free";
    }
  }

  button {
    @include button.default-style;
    cursor: pointer;
  }

  img {
    height: 100%;
  }

  h1 {
    @include font.large;
  }

  h3 {
    @include font.medium;
  }

  .page__inner {
    @media screen and (max-width: 480px) {
      min-width: 360px;
      width: 100%;
    }
    @media screen and (min-width: 480px) and(max-width: 768px) {
      width: 480px;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      width: 768px;
    }
    @media screen and (min-width: 1024px) {
      width: 1024px;
    }
    margin: auto;

    .header {
      height: 54px;
    }

    .main {
      margin: 0 auto;
      box-sizing: border-box;
      position: relative;
    }
  }
}
</style>
