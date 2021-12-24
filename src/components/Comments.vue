<template>
  <div class="comments">
    <h3>comments</h3>
    <div class="comments_inputBox">
      <form @submit.prevent="handleSubmit">
        <input
          id="comment_content"
          v-model="commentInput"
          type="text"
          placeholder="댓글을 입력해주세요"
          @submit.prevent
        />
        <button>
          <img src="../img/add.png" alt="add" />
        </button>
      </form>
    </div>
    <div class="comments_commentsBox">
      <ul>
        <li
          v-for="comment in commentsInfo"
          :key="comment._id"
          class="comments_commentsBox__comment"
        >
          <div class="comments_commentsBox__comment__content">
            <p>
              {{ comment.comment }}
              <button
                v-if="userInfo && userInfo._id === comment.author._id"
                @click="removeComment(comment._id)"
              >
                <img src="../img/remove.png" alt="remove" />
              </button>
            </p>
            <p>{{ comment.createdAt.split("T")[0] }}</p>
          </div>
          <UserInfoSimple :user-info="comment.author" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import UserInfoSimple from "~/components/UserInfoSimple";
import { getUser } from "~/storage/localStorage";

export default {
  components: { UserInfoSimple },
  data() {
    return { commentInput: "" };
  },
  computed: {
    commentsInfo() {
      return this.$store.state.comment.comments;
    },
    userInfo() {
      return getUser().user;
    },
  },
  methods: {
    async handleSubmit() {
      const { user, token } = getUser();
      const commentInfo = {
        postId: window.location.pathname.split("/")[2],
        userId: user ? user._id : null,
        token: token,
        comment: this.commentInput,
      };
      await this.$store.dispatch("comment/newComment", commentInfo);
      this.commentInput = "";
    },
    async removeComment(commentId) {
      const areYouSure = confirm("정말 삭제하시겠습니까?");
      if (!areYouSure) return;
      const { token } = getUser();
      await this.$store.dispatch("comment/removeComment", { token, commentId });
    },
  },
};
</script>

<style lang="scss" scoped>
.comments {
  h3 {
    margin: 0;
    margin-bottom: 20px;
  }
  &_inputBox {
    form {
      display: grid;
      grid-template-columns: auto 10%;
      align-items: center;
      text-align: center;
      width: 100%;

      #comment_content {
        border: none;
        border-bottom: 1px solid #fbb80f;
        margin: 0 10px;
        background: #f7f7f8;
      }
    }

    button {
      height: 30px;
    }
  }

  &_commentsBox {
    &__comment {
      padding: 5px;
      border-radius: 5px;
      box-shadow: 3px 3px 5px 0 #dcdbdb;
      margin: 10px 0;

      &__content {
        display: grid;
        grid-template-columns: auto minmax(100px, 10%);
        margin-bottom: 5px;

        p:first-child {
          display: flex;
          justify-content: space-between;
          button {
            height: 30px;
          }
        }

        p:last-child {
          text-align: center;
        }
      }
    }
  }
}
</style>
