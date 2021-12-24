<template>
  <div v-if="isShowLetter" class="modal" @click="offModal">
    <div class="container">
      <form class="letter" @click.stop @submit.prevent="send">
        <div class="close-modal" @click="offModal">
          <img src="../img/close.png" alt="close" />
        </div>
        <div class="message-container">
          <label for="letter">메세지</label>
          <input
            v-model="message"
            class="message"
            name="letter"
            type="text"
            @submit.prevent="send"
          />
        </div>
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        <button>보내기</button>
      </form>
    </div>
  </div>
</template>

<script>
import sendMessage from "../api/sendMessage";
export default {
  data() {
    return {
      message: "",
      error: "",
    };
  },
  computed: {
    isShowLetter() {
      return this.$store.state.letter.isShowLetter;
    },
    isLoading() {
      return this.$store.state.loading.isLoading;
    },
    authorId() {
      return this.$store.state.letter.receiver;
    },
  },
  methods: {
    async send() {
      if (this.isLoading) {
        return;
      }
      try {
        this.$store.dispatch("loading/startLoading");
        sendMessage({ message: this.message, receiver: this.authorId });
        this.message = "";
        this.$store.dispatch("loading/endLoading");
        this.$store.dispatch("message/updateUserList");
      } catch (e) {
        this.$store.dispatch("loading/endLoading");
        this.error = "서버 통신에 애러가 발생했습니다.";
        return;
      }
      this.offModal();
    },
    offModal() {
      this.$store.dispatch("letter/offLetter");
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
}

.container {
  left: -10px;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.letter {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  width: 50%;
  height: 500px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

  .message-container {
    min-width: 200px;
    width: 80%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    label {
      @include font.large;
      padding: 10px;
    }

    .message {
      @include font.medium;
      padding: 10px;
      flex-grow: 1;
      border-radius: 20px;
      border: solid 2px color.$egg-yellow;
      outline: none;
      text-align: start;
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

  button {
    width: 100px;
    height: 30px;
    margin: 16px;
  }
}
</style>
