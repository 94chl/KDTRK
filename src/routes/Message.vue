<template>
  <div class="container">
    <ul>
      <li
        v-for="user in userList"
        :id="user.sender._id === myId ? user.receiver._id : user.sender._id"
        :key="user.sender._id === myId ? user.receiver._id : user.sender._id"
        :class="user.receiver._id === sender ? 'select' : null"
        @click="openMessageDetail"
      >
        <div class="img-container">
          <img
            ref="profile"
            :src="
              user.sender._id === myId
                ? user.receiver.image || defaultImg
                : user.sender.image || defaultImg
            "
            alt="유저 기본 프로필"
          />
        </div>
        <div class="message-info">
          <div>
            {{
              user.sender.email === myEmail
                ? user.receiver.username
                : user.sender.username
            }}
          </div>
          <div class="message">
            {{ user.message }}
          </div>
          <div class="date">
            {{
              new Date(Date.parse(user.createdAt))
                .toString()
                .split(" ")
                .splice(0, 5)
                .join(" ")
            }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import readMessage from "../api/readMessage";
import { getUser } from "../storage/localStorage";

export default {
  data() {
    return {
      myEmail: "",
      myId: "",
      defaultImg:
        "https://media.vlpt.us/images/alajillo/post/2f787cd0-3828-4097-b9b1-33f24d9fd608/user-circle-regular.svg",
    };
  },
  computed: {
    userList() {
      return this.$store.state.message.userList;
    },
    sender() {
      return this.$store.state.message.sender;
    },
  },
  watch: {
    userList() {
      this.myEmail = getUser().user.email;
      this.myId = getUser().user._id;
    },
  },
  async created() {
    await this.$store.dispatch("message/updateUserList");
    this.$store.dispatch("message/getAlarm");
    this.myEmail = getUser().user.email;
    this.myId = getUser().user._id;
  },
  mounted() {
    this.$store.dispatch("modal/offModal", "alarm");
  },
  methods: {
    openMessageDetail(e) {
      const { id } = e.target.closest("li");
      this.$store.dispatch("message/updateMessageList", id);
      this.$store.dispatch("message/onMessageDetail");
      readMessage(id);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "~/scss/color";
@use "~/scss/font";
@use "~/scss/button";

.select {
  box-shadow: 0 5px 6px 0 rgba(34, 36, 38, 0.5);
}
@media (max-width: 768px) {
  ul {
    width: 100%;
  }
}

@media (min-width: 769px) {
  ul {
    width: 50%;
  }
}
.date {
  @include font.micro;
  color: #f5f4f4;
}
.container {
  position: relative;
  box-sizing: border-box;
  height: 90%;
  ul {
    box-sizing: border-box;
    padding-inline-start: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-y: auto;
    .img-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 8px;
    }
    .message-info {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    li {
      @include font.medium;
      @include button.default-style;
      cursor: pointer;
      display: flex;
      width: 100%;
      height: 100px;
      margin: 16px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:hover {
        box-shadow: 0 5px 6px 0 rgba(34, 36, 38, 0.5);
      }
    }
  }
}
</style>
