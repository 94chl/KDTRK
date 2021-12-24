<template>
  <div class="userInfoSimple">
    <ul class="userInfoSimple_list">
      <li class="userInfoSimple_list__img">
        <div v-if="userInfoSimple.img">
          <img :src="userInfoSimple.img" alt="프로필이미지" />
        </div>
        <div v-else class="userInfoSimple_list__img__default">
          <i class="far fa-user"></i>
        </div>
      </li>
      <li class="userInfoSimple_list__grade">
        <p>{{ userInfoSimple.grade }}</p>
      </li>
      <li class="userInfoSimple_list__name">
        <p>{{ userInfoSimple.nickName }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import checkJSON from "~/utils/checkJSON";

export default {
  props: {
    userInfo: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    userInfoSimple() {
      const userInfoDetail = checkJSON(this.userInfo.fullName);
      const userInfoSimple = {
        img: this.userInfo.coverImage
          ? this.userInfo.coverImage
          : this.userInfo.image
          ? this.userInfo.image
          : null,
        userName: userInfoDetail.userName
          ? userInfoDetail.userName
          : "john doe",
        nickName: userInfoDetail.nickName
          ? userInfoDetail.nickName
          : "john doe",
        grade: userInfoDetail.grade ? userInfoDetail.grade : 1,
      };

      this.userImage = userInfoSimple.img;

      return userInfoSimple;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "~/scss/color";

.userInfoSimple {
  background: color.$egg-yellow;
  height: 32px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  max-width: 130px;

  &_list {
    display: flex;
    padding: 0;
    height: 100%;

    li {
      list-style: none;
      padding: 0 5px;
      border-right: 2px solid #fff;
      box-sizing: border-box;
      color: white;
      display: flex;
      align-items: center;

      &:first-child {
        padding: 0;
      }
      &:last-child {
        border: none;
        overflow: hidden;
        p {
          white-space: nowrap;
        }
      }
      img {
        border-radius: 5px;
      }
    }

    &__img {
      div {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        background: none;
      }

      &__default {
        padding: 0 5px;
      }
    }
  }
}
</style>
