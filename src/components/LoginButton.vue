<template>
  <button @click="showLogin">로그인</button>
</template>

<script>
  export default {
    methods: {
      showLogin() {
        this.$store.dispatch("loginForm/onLoginForm");
      },
    },
  };
</script>
<style lang="scss" scoped>
  @use "~/scss/font";
  @use "~/scss/button";

  button {
    @include button.default-style;
    @include font.medium;
    margin: 14px 0;
    width: 300px;
    height: 40px;
    background: red;
  }
</style>