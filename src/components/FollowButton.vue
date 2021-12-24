<template>
  <div v-if="userInfo && userInfo._id !== authorInfo._id">
    <div class="follow" @click="followUser">
      {{ isFollowed ? "팔로우끊기" : "팔로우하기" }}
    </div>
  </div>
</template>

<script>
import follow from "../api/follow";
import unFollow from "../api/unFollow";
import userAuth from "../api/userAuth";
import { getUser } from "../storage/localStorage";
export default {
  props: {
    authorInfo: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    isFollowed() {
      return this.$store.state.posts.isFollowed;
    },
    userInfo() {
      return getUser() ? getUser().user : null;
    },
  },
  created() {
    this.updateFollow();
  },
  methods: {
    async updateFollow() {
      await userAuth();
      this.$store.dispatch("posts/updateIsFollowed");
    },
    async followUser() {
      if (!this.isFollowed) {
        await follow(this.authorInfo._id);
      } else {
        const user = getUser().user;
        const follow = user.following.filter(
          (item) => item.user === this.authorInfo._id
        );
        const followId = follow[0]._id;
        await unFollow(followId);
      }
      this.updateFollow();
    },
  },
};
</script>

<style lang="scss" scoped>
.follow {
  cursor: pointer;
}
</style>
