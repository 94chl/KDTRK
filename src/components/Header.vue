<template>
  <div class="header">
    <div class="header_logo">
      <RouterLink :to="{ name: 'main' }">
        <img src="../img/logo.png" /><span>EGGGG</span>
      </RouterLink>
    </div>
    <nav class="header_nav">
      <div v-if="user" class="header_nav__userInfoSimple">
        <UserInfoModal :user-info="user" :parent="'header'" />
        <Alarm :alarms="user.notifications" />
        <button class="newPostBtn" @click="goNewPost">
          <img src="../img/add.png" alt="new_post" />
        </button>
        <button>
          <RouterLink :to="{ name: 'message' }">
            <img src="../img/message.png" alt="message" />
          </RouterLink>
        </button>
        <button @click="logOut">로그아웃</button>
      </div>
      <div v-else class="header_nav__loginBtn">
        <button @click="logIn">로그인</button>
      </div>
    </nav>
  </div>
</template>

<script>
import UserInfoModal from "~/components/UserInfoModal";
import Alarm from "~/components/Alarm";
import { removeStorage } from "~/storage/localStorage";

export default {
  components: {
    UserInfoModal,
    Alarm,
  },
  computed: {
    user() {
      const user = window.localStorage.getItem("user")
        ? JSON.parse(window.localStorage.getItem("user"))
        : null;

      return user;
    },
  },
  methods: {
    logIn() {
      this.$store.dispatch("modal/onModal", "login");
    },
    logOut() {
      removeStorage(["user", "token"]);
      history.go(0);
    },
    goNewPost() {
      this.$router.replace({ name: "newPost" });
    },
  },
};
</script>

<style lang="scss" scoped>
@use "~/scss/color";
@use "~/scss/font";
@import url("https://fonts.googleapis.com/css2?family=Sriracha&display=swap");

.header {
  border-bottom: 1px solid #000;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background: color.$egg-white;
  display: flex;
  justify-content: space-around;
  align-items: center;

  &_logo {
    a {
      display: block;
      padding: 0 10px;

      text-decoration: none;
      color: #000;
      display: flex;
      align-items: center;

      span {
        @include font.large;
        font-family: "Sriracha", cursive;
      }
    }
  }

  &_nav {
    height: 32px;
    &__userInfoSimple {
      display: flex;
      align-items: center;

      > * {
        margin: 0 5px;
        &:first-child {
          margin: 0;
        }
      }
    }
  }

  button {
    height: 32px;
  }
}
</style>
