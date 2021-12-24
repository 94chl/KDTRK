<template>
  <div class="likes">
    <div class="likes_now">
      <h3 v-if="likedUser.length < postContents.targetNumber">모집중</h3>
      <!-- <h3>진행중</h3>-->
      <h3 v-if="likedUser.length >= postContents.targetNumber" class="closed">
        마감
      </h3>
      <div>
        <span>{{ likedUser.length }}</span> / {{ postContents.targetNumber }}
      </div>
    </div>

    <div class="likes_likesBox">
      <button
        v-if="
          userInfo &&
          !likedUser.includes(userInfo._id) &&
          authorInfo._id !== userInfo._id &&
          likedUser.length < postContents.targetNumber
        "
        @click="newLike()"
      >
        <img src="../img/join.png" alt="join" />
      </button>
      <button
        v-if="
          userInfo &&
          likedUser.includes(userInfo._id) &&
          authorInfo._id !== userInfo._id
        "
        class="quitBtn"
        @click="removeLike()"
      >
        <img src="../img/join.png" alt="quit" />
        <img src="../img/close_red.png" alt="quit" />
      </button>
      <div
        v-if="userInfo && authorInfo._id === userInfo._id"
        class="likes_likesBox__likedUsers"
      >
        <p v-for="likedUserInfo in likedUserInfos" :key="likedUserInfo._id">
          <UserInfoModal :user-info="likedUserInfo" :parent="'like'" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { getUser } from "~/storage/localStorage";
  import UserInfoModal from "~/components/UserInfoModal";

  export default {
    components: { UserInfoModal },
    props: {
      authorInfo: {
        type: Object,
        default: () => {},
      },
      postContents: {
        type: Object,
        default: () => {},
      },
    },
    computed: {
      likedUser() {
        const users = this.$store.state.like.likes.map((like) => like.user);
        return users;
      },
      likedUserInfos() {
        const userInfo = this.$store.state.like.likedUserInfo;
        return userInfo;
      },
      userInfo() {
        return getUser() ? getUser().user : null;
      },
    },
    watch: {
      likedUser() {
        this.$store.dispatch("like/getLikedUserInfo", this.likedUser);
      },
    },
    created() {
      this.$store.dispatch("like/getLikedUserInfo", this.likedUser);
    },
    methods: {
      async newLike() {
        const postId = window.location.pathname.split("/")[2];
        const { token } = getUser();
        await this.$store.dispatch("like/newLike", { token, postId });
      },
      async removeLike() {
        const { token } = getUser();
        const likedId = this.$store.state.like.likes.filter(
          (like) => like.user === this.userInfo._id
        )[0];
        await this.$store.dispatch("like/removeLike", {
          token,
          likedId: likedId._id,
        });
      },
    },
  };
</script>


<style lang="scss" scoped>
  .likes {
    &_now {
      display: flex;
      align-items: flex-start;
      margin-right: 10px;

      h3 {
        margin: 0;
        margin-right: 10px;
        &.closed {
          color: red;
        }
      }
    }

    &_likesBox {
      button {
        width: 100px;
        &.quitBtn {
          position: relative;
          img:last-child {
            position: absolute;
            right: 38px;
            top: 14px;
            height: 50%;
          }
        }
      }

      &__likedUsers {
        display: flex;
        flex-flow: wrap;
        p {
          margin: 5px;
          width: fit-content;
        }
      }
    }
  }
</style>
