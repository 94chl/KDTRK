<template>
  <div ref="scroll" class="contents__wrapper">
    <div v-for="post in posts" :key="post._id" class="contents__post">
      <RouterLink :to="{ name: 'post', params: { id: post._id } }">
        <div
          class="post__img"
          :style="
            post.image
              ? `background-image: url(${post.image})`
              : `background-image: url('https://res.cloudinary.com/dyt02nbtq/image/upload/v1635252224/post/91f4c013-2780-4824-8af0-632ec94b15d8.png')`
          "
        ></div>
      </RouterLink>
      <div class="post__description">
        <RouterLink :to="{ name: 'post', params: { id: post._id } }">
          <div class="title">
            {{ JSON.parse(post.title).title }}
          </div>
          <div class="content">
            {{ JSON.parse(post.title).content }}
          </div>
        </RouterLink>
        <div>
          1인당
          <span class="price"
            >{{
              Math.ceil(
                JSON.parse(post.title).price /
                  (parseInt(JSON.parse(post.title).targetNumber) + 1)
              )
            }}원</span
          >
        </div>
        <div class="targetNumber">
          {{ parseInt(JSON.parse(post.title).targetNumber) }}명 모집
        </div>
      </div>
      <div class="post__button">
        <div class="author">
          <UserInfoModal :user-info="post.author" :parent="post._id" />
        </div>
        <i
          v-if="username === post.author.username"
          :id="post._id"
          class="far fa-edit post__edit-btn"
          @click="goEditPost"
        ></i>
        <i
          v-if="username === post.author.username"
          :id="post._id"
          class="far fa-trash-alt post__delete-btn"
          @click="deletePost"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import { getPost, removeStorage } from "~/storage/localStorage";
import UserInfoModal from "~/components/UserInfoModal";

export default {
  components: { UserInfoModal },
  data() {
    return {
      username: "",
    };
  },
  computed: {
    posts() {
      return this.$store.state.posts.posts;
    },
    isPostEnd() {
      return this.$store.state.posts.isPostEnd;
    },
  },
  created() {
    if (getPost()) removeStorage(["post"]);
    this.$store.dispatch("posts/readPosts");
  },
  mounted() {
    if (window.localStorage.getItem("user")) {
      this.username = JSON.parse(localStorage.getItem("user")).username;
    }
    let timer = null;
    this.$refs.scroll.addEventListener("scroll", () => {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;

          const { scrollHeight, scrollTop, clientHeight } = this.$refs.scroll;
          const isScrollEnded = scrollHeight - 10 < scrollTop + clientHeight;

          console.log(isScrollEnded);
          if (isScrollEnded) {
            this.loadMore();
          }
        }, 400);
      }
    });
  },
  methods: {
    async goEditPost(e) {
      await this.$store.dispatch("posts/readPost", e.target.id);
      this.$router.push({ name: "updatePost", params: { id: e.target.id } });
    },
    deletePost(e) {
      const areYouSure = confirm("정말 삭제하시겠습니까?");
      if (!areYouSure) return;
      this.$store.dispatch("posts/deletePost", e.target.id);
    },
    async loadMore() {
      if (!this.isPostEnd) {
        await this.$store.commit("posts/updateOffset");
        this.$store.dispatch("posts/loadMore");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.contents__wrapper {
  display: grid;
  gap: 40px 20px;
  padding: 0 10px;

  @media screen and (max-width: 480px) {
    margin: auto;
    grid-template-columns: 1fr;
    width: 80%;
    max-width: 300px;
  }
  @media screen and (min-width: 480px) and(max-width: 768px) {
    margin: auto;
    grid-template-columns: repeat(2, 1fr);
    /* width: 90%; */
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    margin: auto;
    /* width: 90%; */
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  .contents__post {
    margin: 4px;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    box-shadow: 10px 10px 10px rgb(233, 231, 231);
    background: #fff;

    .post__img {
      width: auto;
      height: 200px;
      background-color: #ffcd58;
      background-size: cover;
      border-radius: 20px;

      &:hover {
        cursor: pointer;
        filter: brightness(80%);
      }
    }

    .post__description {
      display: flex;
      flex-direction: column;
      padding: 10px 5px;

      .title,
      .content {
        color: black;
        text-decoration-line: none;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      .price {
        color: red;
        font-weight: 700;
      }
    }

    .post__button {
      display: flex;
      justify-content: end;
      align-items: center;
      padding: 10px;

      .author {
        color: gray;
      }

      i {
        padding: 5px;
        background-color: #ffcd58;
        border-radius: 10px;
        margin-left: 5px;
        color: white;
        &:hover {
          cursor: pointer;
          filter: brightness(80%);
        }
      }
    }
  }
}
</style>
