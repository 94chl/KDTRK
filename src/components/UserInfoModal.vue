<template>
  <div class="userInfo">
    <UserInfoSimple :user-info="userInfo" @click="changeUserInfoModal" />
    <div v-if="isShowUserInfo && isLogin" class="modal">
      <ul class="modal_userInfoList">
        <li v-if="isUser">
          <RouterLink :to="{ name: 'updateUser' }" @click="changeUserInfoModal">
            개인정보 수정
          </RouterLink>
        </li>
        <li v-if="isUser">
          <RouterLink :to="{ name: 'mypage' }" @click="changeUserInfoModal">
            마이페이지
          </RouterLink>
        </li>
        <li v-if="!isUser" @click="showLetter">메세지 보내기</li>
        <li v-if="!isUser">
          <FollowButton :author-info="userInfo" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import UserInfoSimple from "~/components/UserInfoSimple";
import FollowButton from "~/components/FollowButton";
import { getUser } from "~/storage/localStorage";

export default {
  components: { UserInfoSimple, FollowButton },
  props: {
    userInfo: {
      type: Object,
      default: () => {},
    },
    parent: {
      type: String,
      default: "",
    },
  },
  computed: {
    isLogin() {
      return getUser().user ? true : false;
    },
    isShowUserInfo() {
      return this.$store.state.modal[
        `userInfo${this.parent}${this.userInfo._id}`
      ];
    },
    isUser() {
      return getUser().user ? getUser().user._id === this.userInfo._id : false;
    },
  },
  created() {},
  methods: {
    changeUserInfoModal() {
      if (!this.isShowUserInfo) {
        this.$store.dispatch(
          "modal/onModal",
          `userInfo${this.parent}${this.userInfo._id}`
        );
        this.$store.commit("letter/setReceiver", this.userInfo._id);
      } else {
        this.$store.dispatch(
          "modal/offModal",
          `userInfo${this.parent}${this.userInfo._id}`
        );
      }
    },
    showLetter() {
      const { token, user } = getUser();
      if (!token) {
        this.$store.dispatch("modal/onModal", "login");
        return;
      }
      if (this.authorId === user._id) {
        alert("자기한테 편지 쓰면 안되요😯");
        return;
      }
      this.$store.dispatch("letter/onLetter");
      this.changeUserInfoModal();
    },
  },
};
</script>

<style lang="scss" scoped>
@use "~/scss/color";

.userInfo {
  position: relative;
  text-align: center;
  cursor: pointer;

  .modal {
    z-index: 11;
    position: absolute;
    top: 32px;
    right: 0;
    width: fit-content;
    line-height: normal;
    border: 1px solid color.$egg-yellow;
    border-top: none;
    border-radius: 0 0 5px 5px;
    box-shadow: 0 2px 0 0 rgba(34, 36, 38, 0.15);
    background: #fff;

    &_userInfoList {
      margin: 0;

      li {
        list-style: none;
        margin: 5px 0;
        min-width: 30px;
        padding: 0 5px;

        &:last-child {
          margin: 0;
        }
        &:hover {
          background: color.$egg-yellow;
          border-radius: 5px;
          color: #fff;
        }

        a {
          text-decoration: none;
          color: #000;
        }
      }
    }
  }

  img {
    height: 100%;
  }
}
</style>
