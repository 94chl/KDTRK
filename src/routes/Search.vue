<template>
  <div class="app__main">
    <PostSearch />
    <div class="main__title">검색 결과</div>
    <div class="main__searched">
      <section class="searched__user">
        <div class="user__tab-name tab">유저 목록</div>
        <div v-if="users.length" class="user__list">
          <div v-for="user of users" :key="user._id" class="user">
            <div class="user__name">
              <UserInfoModal :user-info="user" :parent="'search'" />
            </div>
            <ul class="user__props">
              <li>닉네임: {{ JSON.parse(user.fullName).nickName }}</li>
              <li>지역: {{ JSON.parse(user.fullName).location }}</li>
              <li>연락처: {{ JSON.parse(user.fullName).phone }}</li>
            </ul>
          </div>
        </div>
        <div v-else class="no-result">검색 결과 없음</div>
      </section>
      <setcion class="searched__post">
        <div class="post__tab-name tab">게시글 목록</div>
        <div v-if="posts.length" class="post__list">
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
                <span class="price">
                  {{
                    JSON.parse(post.title).price /
                    JSON.parse(post.title).targetNumber
                  }}원
                </span>
              </div>
              <div>{{ JSON.parse(post.title).targetNumber }}명 모집</div>
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
        <div v-else class="no-result">검색 결과 없음</div>
      </setcion>
    </div>

    <div v-if="!posts.length && !users.length" class="searchResult_noResult">
      No result
    </div>
  </div>
</template>

<script>
  import PostSearch from "../components/PostSearch.vue";
  import checkJSON from "~/utils/checkJSON";
  import UserInfoModal from "~/components/UserInfoModal";

  export default {
    components: {
      PostSearch,
      UserInfoModal,
    },
    data() {
      return {
        username: "",
      };
    },
    computed: {
      keyword() {
        return this.$store.state.postSearchStore.fixedKeyword;
      },
      users() {
        const users = this.$store.state.postSearchStore.searchResults.filter(
          (result) =>
            checkJSON(result.fullName) &&
            checkJSON(result.fullName).nickName &&
            checkJSON(result.fullName).nickName.match(this.keyword[0])
        );
        return users;
      },
      posts() {
        const posts = this.$store.state.postSearchStore.searchResults.filter(
          (result) => {
            const checkResult = checkJSON(result.title);
            if (
              checkResult &&
              ((checkResult.title && checkResult.title.match(this.keyword[0])) ||
                (checkResult.content &&
                  checkResult.content.match(this.keyword[0])))
            ) {
              return result;
            }
          }
        );
        return posts;
      },
    },
    mounted() {
      if (window.localStorage.getItem("user")) {
        this.username = JSON.parse(localStorage.getItem("user")).username;
      }
    },
  };
</script>

<style lang="scss" scoped>
  @use "~/scss/color";
  .no-result {
    color: gray;
  }

  .app__main {
    /*NOTE header높이 : 54px */
    height: calc(100vh - 54px);
    display: flex;
    flex-direction: column;
    .main__title {
      font-size: 20px;
      line-height: 30px;
      padding: 14px 0;
    }
    .main__searched {
      top: 108px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  .main__title,
  .tab {
    color: gray;
  }
  .searched__user,
  .searched__post {
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  .user__tab-name,
  .post__tab-name {
    font-size: 18px;
    padding: 10px 0;
  }
  .user__list,
  .post__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px 20px;
    @media screen and (max-width: 480px) {
      margin: auto;
      grid-template-columns: 1fr;
      width: 100%;
      max-width: 300px;
    }
    @media screen and (min-width: 480px) and(max-width: 768px) {
      margin: auto;
      grid-template-columns: repeat(2, 1fr);
      width: 100%;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
      margin: auto;
      width: 100%;
    }
    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
      width: 100%;
    }
  }
  .user,
  .contents__post {
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    box-shadow: 10px 10px 10px rgb(233, 231, 231);
    background: #fff;
  }
  .user__name {
    border: 2px solid color.$egg-yellow;
    border-top: none;
    border-bottom: none;
    border-radius: 20px 20px 0 0;
    padding: 2px 10px;
    background-color: color.$egg-yellow;
  }
  .user__props {
    border: 2px solid color.$egg-yellow;
    border-top: none;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    list-style: none;
    padding: 10px;
    margin: 0;
    li {
      padding-top: 5px;
    }
  }
  .contents__post {
    margin: 4px;
    .post__img {
      width: auto;
      height: 200px;
      background-color: color.$egg-yellow;
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
      padding: 10px;
      .title,
      .content {
        color: black;
        /* text-decoration: none; */
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .price {
        color: color.$egg-yellow;
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
        background-color: color.$egg-yellow;
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
</style>