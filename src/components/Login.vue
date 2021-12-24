<template>
  <div v-if="isShowLoginForm" class="modal" @click="offModal">
    <form class="loginform" @click.stop @submit.prevent="login">
      <h1>로그인</h1>
      <div class="close-modal" @click="offModal">
        <img src="../img/close.png" alt="close" />
      </div>
      <label for="email">이메일</label>
      <input v-model="email" name="email" type="text" />
      <label for="password">비밀번호</label>
      <input v-model="password" name="password" type="password" />

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      <div class="loginBtns">
        <button>로그인</button>
        <button @click.prevent="goSignup">회원가입</button>
      </div>
    </form>
  </div>
</template>

<script>
  import reqeustLogin from "../api/login";
  import { setUser } from "../storage/localStorage";

  export default {
    data() {
      return {
        email: "",
        password: "",
        error: "",
      };
    },
    computed: {
      isShowLoginForm() {
        return this.$store.state.modal.login;
      },
      isLoading() {
        return this.$store.state.loading.isLoading;
      },
    },
    methods: {
      async login() {
        if (this.isLoading) {
          return;
        }
        const data = {
          email: this.email,
          password: this.password,
        };
        try {
          this.$store.dispatch("loading/startLoading");
          const result = await reqeustLogin(data);
          this.$store.dispatch("loading/endLoading");
          setUser(result);
          history.go(0);
        } catch (e) {
          this.$store.dispatch("loading/endLoading");
          this.error = "다시 입력해주세요";
          this.password = "";
          return;
        }
        this.offModal();
      },
      offModal() {
        this.error = "";
        this.$store.dispatch("modal/offModal", "login");
      },
      goSignup() {
        this.$router.push("/signup");
      },
    },
  };
</script>

<style lang="scss" scoped>
  @use "~/scss/font";
  @use "~/scss/button";
  @use "~/scss/color";

  .modal {
    z-index: 11;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loginform {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 370px;
    box-sizing: border-box;
    height: 400px;
    padding: 40px;
    text-align: center;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

    label {
      @include font.medium;
    }

    input {
      @include button.default-style;
      width: 200px;
      height: 30px;
      background: #fff;
      border: 1px solid color.$egg-yellow;
      color: #000;
      font-weight: 400;
      text-align: center;
      margin-bottom: 10px;

      &:focus {
        background: color.$egg-yellow;
        color: #fff;
      }
    }

    .error-message {
      color: red;
    }

    .close-modal {
      cursor: pointer;
      position: absolute;
      right: 8px;
      top: 8px;
      width: 20px;
      height: 20px;
    }
  }
  .loginBtns {
    margin: 15px 0;
    display: flex;
    flex-direction: column;

    button {
      @include font.small;
      @include button.default-style;
      margin: 5px 0;
      width: 100px;
      height: 30px;
    }
  }
</style>