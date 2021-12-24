<template>
  <div class="modal">
    <div class="close-modal" @click="offModal">
      <img src="../img/close.png" alt="close" />
    </div>
    <ul ref="messageList" class="messageDetail">
      <li
        v-for="message in messageList"
        :key="message"
        :class="me === message.sender.email ? 'right' : 'left'"
      >
        <div class="text">
          {{ message.message }}
        </div>
        <div class="date">
          {{
            new Date(Date.parse(message.createdAt))
              .toString()
              .split(" ")
              .splice(0, 5)
              .join(" ")
          }}
        </div>
      </li>
    </ul>
    <form @submit.prevent="send">
      <input v-model="message" type="text" />
      <button>보내기</button>
    </form>
  </div>
</template>

<script>
import { getUser } from "../storage/localStorage";
import sendMessage from "../api/sendMessage";
const sleep = function (time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });
};
export default {
  data() {
    return {
      me: "",
      message: "",
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading;
    },
    messageList() {
      return this.$store.state.message.messageList;
    },
    sender() {
      return this.$store.state.message.sender;
    },
  },
  watch: {
    messageList() {
      this.scrollDown();
    },
  },
  created() {
    this.me = getUser().user.email;
  },
  methods: {
    async scrollDown() {
      await sleep(10);
      this.$refs.messageList.scroll({
        top: this.$refs.messageList.scrollHeight,
        behavior: "smooth",
      });
    },
    offModal() {
      this.$store.dispatch("message/offMessageDetail");
    },
    async send() {
      if (this.isLoading) {
        return;
      }
      try {
        this.$store.dispatch("loading/startLoading");
        sendMessage({ message: this.message, receiver: this.sender });
        this.$store.dispatch("message/updateMessageList", this.sender);
        this.$store.dispatch("message/updateUserList");
        this.message = "";
        this.$store.dispatch("loading/endLoading");
      } catch (e) {
        this.$store.dispatch("loading/endLoading");
        this.error = "서버 통신에 애러가 발생했습니다.";
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "~/scss/font";
@use "~/scss/button";
@use "~/scss/color";

@media (max-width: 768px) {
  .modal {
    left: 0;
    width: 100%;
  }
}

@media (min-width: 769px) {
  /* .close-modal { */
  /* display: none; */
  /* } */
  .modal {
    border-left: 1px solid color.$egg-gray;
    left: 51%;
    width: 49%;
  }
}

.modal {
  box-sizing: border-box;
  z-index: 9;
  position: absolute;
  top: 0;
  bottom: 0;
  padding-left: 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  height: 90vh;
  .close-modal {
    cursor: pointer;
    position: absolute;
    right: 24px;
    top: 16px;
  }
}

form {
  box-sizing: border-box;
  padding: 8px;
  display: flex;

  input {
    @include font.medium;
    outline: none;
    padding-left: 16px;
    border: 1px solid color.$egg-gray;
    flex-grow: 1;
    flex-shrink: 1;
    border-radius: 20px;
    margin-right: 10px;
    width: calc(100% - 50px);
  }
  button {
    flex-shrink: 0;
    color: black;
  }
}
ul {
  padding-left: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  flex-grow: 1;
  .left {
    align-self: flex-start;
    .text,
    .date {
      align-self: flex-start;
    }
  }
  .right {
    align-self: flex-end;
    .text,
    .date {
      align-self: flex-end;
    }
  }
  li {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px;
  }
  .text {
    margin-bottom: 8px;
    @include font.medium;
    background-color: color.$egg-yellow;
    color: black;
    border-radius: 20px;
    padding: 8px;
    width: fit-content;
    max-width: 500px;
  }
  .date {
    @include font.micro;
    color: color.$egg-gray;
    text-align: right;
  }
}
</style>
