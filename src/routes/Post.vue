<template>
  <div class="post">
    <div v-if="postContents" class="post_postBox">
      <div
        class="post_postBox__image"
        :style="
          postInfo.image
            ? `background-image: url(${postInfo.image}`
            : `background-image: url('https://res.cloudinary.com/dyt02nbtq/image/upload/v1635252224/post/91f4c013-2780-4824-8af0-632ec94b15d8.png')`
        "
      ></div>
      <div class="post_postBox_itemInfo">
        <div v-if="postContents.title" class="post_postBox_itemInfo__title">
          <h3>{{ postContents.title }}</h3>
          <div
            v-if="username === authorInfo.username"
            class="post_postBox_itemInfo__title__editBtns"
          >
            <button @click="goEditPost">
              <img src="../img/edit.png" alt="edit" />
            </button>
            <button @click="deletePost">
              <img src="../img/remove.png" alt="remove" />
            </button>
          </div>
        </div>
        <div v-if="postContents" class="post_postBox_itemInfo__author">
          <UserInfoModal
            v-if="authorInfo.nickName"
            :user-info="authorInfo"
            :parent="'post'"
          />
          <LetterOnButton :receiver="authorInfo" />
        </div>
        <div v-if="postContents" class="post_postBox_itemInfo__price">
          총 가격 : <span>{{ postContents.price }}원</span>
        </div>
        <div v-if="postContents" class="post_postBox_itemInfo__likes">
          <Likes
            v-if="postInfo.likes"
            :author-info="authorInfo"
            :post-contents="postContents"
          />
        </div>
      </div>
    </div>
    <div v-if="postContents" class="post_postBox">
      <div v-if="postContents.content" class="post_postBox__content">
        <p>{{ postContents.content }}</p>
      </div>
    </div>
    <div v-if="postContents" class="post_postBox">
      <div v-if="postInfo.comments" class="post_postBox__comments">
        <Comments />
      </div>
    </div>
    <div v-if="!postContents" class="post_postBox__noContents">
      <h3>ERROR: bad contents format</h3>
    </div>
  </div>
</template>

<script>
import checkJSON from "~/utils/checkJSON";
import Comments from "~/components/Comments";
import Likes from "~/components/Likes";
import LetterOnButton from "~/components/LetterOnButton";
import UserInfoModal from "~/components/UserInfoModal";
import { getUser } from "~/storage/localStorage";

export default {
  components: {
    Comments,
    LetterOnButton,
    Likes,
    UserInfoModal,
  },
  computed: {
    postInfo() {
      const post = this.$store.state.posts.post;
      if (Object.keys(post).length) {
        this.$store.commit("comment/loadComments", post.comments);
        this.$store.commit("like/loadLikes", post.likes);
        return post;
      } else {
        return null;
      }
    },
    postContents() {
      const postContents = this.postInfo ? this.postInfo.title : null;
      return checkJSON(postContents);
    },
    authorInfo() {
      const authorInfo = this.postInfo ? this.postInfo.author : null;
      return checkJSON(authorInfo.fullName)
        ? { ...authorInfo, ...checkJSON(authorInfo.fullName) }
        : null;
    },
    username() {
      if (getUser() && getUser().user) return getUser().user.username;
      return null;
    },
  },
  created() {
    const postId = window.location.pathname.split("/")[2];
    this.$store.dispatch("posts/getPostInfo", postId);
  },
  methods: {
    goEditPost(e) {
      this.$router.push({
        name: "updatePost",
        params: { id: this.postInfo._id },
      });
      this.$store.dispatch("posts/readPost", this.postInfo._id);
    },
    deletePost(e) {
      const areYouSure = confirm("정말 삭제하시겠습니까?");
      if (!areYouSure) return;
      this.$store.dispatch("posts/deletePost", this.postInfo._id);
      this.$router.push({ name: "main" });
    },
  },
};
</script>

<style lang="scss" scoped>
@use "~/scss/font";

.post {
  h3 {
    margin: 0;
  }

  &_postBox {
    padding: 10px;
    border: 1px solid #fbb80f;
    border-radius: 10px;
    margin: 10px 0;
    min-height: 100px;
    background: #f7f7f8;

    &:first-child {
      gap: 20px;
      @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      @media screen and (min-width: 768px) {
        display: grid;
        grid-template-columns: 300px calc(100% - 320px);
      }
    }

    &__image {
      border: none;
      width: 300px;
      height: 300px;
      background-color: #fbb80f;
      background-size: cover;
      border-radius: 20px;
      margin: auto;
    }

    &_itemInfo {
      width: 100%;
      > div {
        margin-top: 15px;

        &:first-child {
          margin-top: 0;
        }
      }

      &__title {
        display: flex;
        justify-content: space-between;

        h3 {
          @include font.large;
        }

        &__editBtns {
          button {
            height: 30px;
            margin: 0 5px;
            font-size: 0;
          }
        }
      }

      &__author {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &__price {
        @include font.medium;
        text-align: right;

        span {
          @include font.medium;
          color: red;
          font-weight: 700;
          letter-spacing: 0.2em;
        }
      }
    }
  }
}
</style>
