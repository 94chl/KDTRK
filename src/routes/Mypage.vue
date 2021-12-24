<template>
  <div @click="offMessageDetail">
    <div v-if="userId" class="mypage">
      <h3>회원 정보</h3>
      <div class="mypage_userInfo">
        <div class="mypage_userInfo__img">
          <ProfileUploader />
        </div>
        <div class="mypage_userInfo__details">
          <ul v-if="userInfoDetail">
            <li>
              <span>닉네임 : </span>
              <span> {{ userInfoDetail.nickName }}</span>
            </li>
            <li>
              <span>등급 : </span>
              <span> {{ userInfoDetail.grade }}</span>
            </li>
            <li>
              <span>가입일 : </span>
              <span> {{ userInfo.createdAt.slice(0, 10) }}</span>
            </li>
            <li>
              <span>이름 : </span>
              <span> {{ userInfoDetail.userName }}</span>
            </li>
            <li>
              <span>이메일 : </span>
              <span> {{ userInfo.email }}</span>
            </li>
            <li>
              <span>지역 : </span>
              <span> {{ userInfoDetail.location }}</span>
            </li>
            <li>
              <span>연락처 : </span>
              <span> {{ userInfoDetail.phone }}</span>
            </li>
            <li class="mypage_userInfo__details__edit">
              <RouterLink :to="{ name: 'updateUser' }">
                개인정보 수정
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <h3>작성 포스트({{ userPosts.length }})</h3>
      <div class="mypage_posts">
        <div
          v-for="post in userPosts"
          v-if="userPosts.length"
          :key="post._id"
          class="contents__post"
        >
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
                  JSON.parse(post.title).price /
                  (parseInt(JSON.parse(post.title).targetNumber) + 1)
                }}원</span
              >
            </div>
            <div class="targetNumber">
              {{ JSON.parse(post.title).targetNumber }}명 모집
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
        <div v-else class="emptyList">
          <span>No Posts</span>
        </div>
      </div>

      <h3>참가 포스트({{ userLikes.length }})</h3>
      <div class="mypage_likes">
        <div
          v-for="post in userLikes"
          v-if="userLikes.length"
          :key="post._id"
          class="contents__post"
        >
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
                  parseInt(JSON.parse(post.title).price) /
                  (parseInt(JSON.parse(post.title).targetNumber) + 1)
                }}원</span
              >
            </div>
            <div class="targetNumber">
              {{ JSON.parse(post.title).targetNumber }}명 모집
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
        <div v-else class="emptyList">
          <span>No Posts</span>
        </div>
      </div>

      <h3>팔로잉({{ userFollowings.length }})</h3>
      <div class="mypage_followings">
        <ul v-if="userFollowings.length">
          <li
            v-for="user in userFollowings"
            :key="user._id"
            :data-id="user.followingId"
          >
            <div class="follow__img">
              <img v-if="user.image" :src="user.image" alt="유저 기본 프로필" />
              <img
                v-else
                src="https://media.vlpt.us/images/alajillo/post/2f787cd0-3828-4097-b9b1-33f24d9fd608/user-circle-regular.svg"
                alt="유저 기본 프로필"
              />
            </div>
            <div class="follow__info">
              <div>
                {{ user.nickName }}
              </div>
              <div class="createdAt">
                {{ user.createdAt }}
              </div>
            </div>
            <div class="follow__btns">
              <button @click="unfollow">
                <img src="../img/remove.png" alt="언팔로우" />
              </button>
              <button
                :id="user._id"
                class="onMessageModal"
                @click="openMessageDetail"
              >
                <img src="../img/message.png" alt="메세지" />
              </button>
            </div>
          </li>
        </ul>
        <div v-else class="emptyList">
          <span>No Followings</span>
        </div>
      </div>

      <h3>팔로워({{ userFollowers.length }})</h3>
      <div class="mypage_followers">
        <ul v-if="userFollowers.length">
          <li v-for="user in userFollowers" :key="user._id">
            <div class="follow__img">
              <img v-if="user.image" :src="user.image" alt="유저 기본 프로필" />
              <img
                v-else
                src="https://media.vlpt.us/images/alajillo/post/2f787cd0-3828-4097-b9b1-33f24d9fd608/user-circle-regular.svg"
                alt="유저 기본 프로필"
              />
            </div>
            <div class="follow__info">
              <div>
                {{ user.nickName }}
              </div>
              <div class="createdAt">
                {{ user.createdAt }}
              </div>
            </div>
            <div class="follow__btns">
              <button
                :id="user._id"
                class="onMessageModal"
                @click="openMessageDetail"
              >
                <img src="../img/message.png" alt="메세지" />
              </button>
            </div>
          </li>
        </ul>
        <div v-else class="emptyList">
          <span>No Followers</span>
        </div>
      </div>

      <h3>메세지({{ userMessageSenders.length }})</h3>
      <div class="mypage_message">
        <ul v-if="userMessageSenders.length">
          <li
            v-for="user in userMessageSenders"
            :id="user.sender._id === myId ? user.receiver._id : user.sender._id"
            :key="
              user.sender._id === myId ? user.receiver._id : user.sender._id
            "
            class="onMessageModal"
            @click="openMessageDetail"
          >
            <div class="img-container">
              <img
                src="https://media.vlpt.us/images/alajillo/post/2f787cd0-3828-4097-b9b1-33f24d9fd608/user-circle-regular.svg"
                alt="유저 기본 프로필"
              />
            </div>
            <div class="message-info">
              <div>
                {{
                  user.sender.email === userInfo.email
                    ? user.receiver.username
                    : user.sender.username
                }}
              </div>
              <div class="message">
                {{ user.message }}
              </div>
            </div>
          </li>
        </ul>
        <div v-else class="emptyList">
          <span>No Messages</span>
        </div>
      </div>
    </div>
    <div v-else>No Login Data</div>
  </div>
</template>

<script>
import { getUser } from "../storage/localStorage";
import ProfileUploader from "~/components/ProfileUploader";
import checkJSON from "~/utils/checkJSON";
import UserInfoModal from "~/components/UserInfoModal";
import readMessage from "../api/readMessage";

export default {
  components: { ProfileUploader, UserInfoModal },
  computed: {
    userId() {
      return getUser().user ? getUser().user._id : null;
    },
    userInfo() {
      const userInfo = this.$store.state.mypage.userInfo;
      return userInfo ? userInfo : null;
    },
    userInfoDetail() {
      const userInfoDetail = checkJSON(this.userInfo.fullName);
      return userInfoDetail ? userInfoDetail : null;
    },
    userPosts() {
      const userPosts = this.$store.state.mypage.posts;
      return userPosts ? userPosts : [];
    },
    userLikes() {
      const userLikes = this.$store.state.mypage.likedPosts;
      return userLikes ? userLikes : [];
    },
    userFollowings() {
      const userFollowings = this.$store.state.mypage.userFollowings;
      return userFollowings ? userFollowings : [];
    },
    userFollowers() {
      const userFollowers = this.$store.state.mypage.userFollowers;
      return userFollowers ? userFollowers : [];
    },
    userMessageSenders() {
      return this.$store.state.message.userList;
    },
    isShowMessageDetail() {
      return this.$store.state.message.isShowMessageDetail;
    },
  },
  async created() {
    if (this.userId) {
      this.$store.commit("mypage/updateUserId", this.userId);
      await this.$store.dispatch("mypage/getUserInfo");
      await this.$store.dispatch("mypage/getUserPosts");
      await this.$store.dispatch("mypage/getUserLikes");
      await this.$store.dispatch("mypage/getUserFollowers");
      await this.$store.dispatch("mypage/getUserFollowings");
      await this.$store.dispatch("message/updateUserList");
    }
  },
  methods: {
    openMessageDetail(e) {
      const { id } = e.target.closest(".onMessageModal");
      this.$store.dispatch("message/updateMessageList", id);
      this.$store.dispatch("message/onMessageDetail");
      readMessage(id);
    },
    offMessageDetail(e) {
      if (!e.target.closest(".modal") && !e.target.closest(".onMessageModal")) {
        this.$store.dispatch("message/offMessageDetail");
      }
    },
    async unfollow(e) {
      const targetId = e.target.closest("li").dataset.id;
      await this.$store.dispatch("mypage/unFollow", targetId);
    },
  },
};
</script>

<style scoped lang="scss">
@use "~/scss/font";
@use "~/scss/button";
@use "~/scss/color";
.mypage {
  > h3 {
    @include font.medium;
    color: #000;
    margin: 5px;
    font-weight: 700;
  }
  > div {
    min-height: 100px;
    padding: 10px;
    border: 1px solid color.$egg-yellow;
    border-radius: 10px;
    margin-bottom: 20px;
    .emptyList {
      @include font.medium;
      font-weight: 700;
    }
  }
  &_userInfo {
    display: grid;
    align-items: center;
    @media screen and (max-width: 480px) {
      grid-template-columns: 1fr;
      &__img {
        width: 360px;
      }
    }
    @media screen and (min-width: 480px) {
      grid-template-columns: minmax(100px, 50%) 50%;
      &__img {
        width: 238px;
      }
    }
    > div {
      justify-self: center;
    }
    &__img {
    }
    &__details {
      justify-self: center;
      li {
        margin: 10px 0;
        span {
          &:first-child {
            font-weight: 700;
          }
        }
      }
      &__edit {
        text-align: center;
        > a {
          @include button.default-style;
          text-decoration: none;
        }
      }
    }
  }
  &_posts,
  &_likes {
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
  &_followers,
  &_followings {
    position: relative;
    box-sizing: border-box;
    ul {
      box-sizing: border-box;
      padding-inline-start: 0;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      overflow-y: auto;
      display: grid;
      gap: 20px;
      @media screen and (max-width: 480px) {
        margin: auto;
        grid-template-columns: 1fr;
      }
      @media screen and (min-width: 480px) and(max-width: 768px) {
        margin: auto;
        grid-template-columns: repeat(2, 1fr);
      }
      @media screen and (min-width: 768px) and (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
        margin: auto;
      }
      @media screen and (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
      }
      li {
        @include font.medium;
        border-radius: 20px;
        border: none;
        background-color: color.$egg-yellow;
        color: white;
        outline: none;
        box-sizing: border-box;
        padding: 5px;
        font-weight: 700;
        display: flex;
        width: 100%;
        height: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 8px;
        div {
          &.follow__img {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              margin-right: 8px;
            }
          }
          &.follow__info {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            div:last-child {
              @include font.small;
            }
          }
          &.follow__btns {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            button {
            }
          }
        }
      }
    }
  }
  &_message {
    position: relative;
    box-sizing: border-box;
    ul {
      box-sizing: border-box;
      padding-inline-start: 0;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      overflow-y: auto;
      display: grid;
      gap: 20px;
      @media screen and (max-width: 480px) {
        margin: auto;
        grid-template-columns: 1fr;
      }
      @media screen and (min-width: 480px) and(max-width: 768px) {
        margin: auto;
        grid-template-columns: repeat(2, 1fr);
      }
      @media screen and (min-width: 768px) and (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
        margin: auto;
      }
      @media screen and (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
      }
      li {
        @include font.medium;
        @include button.default-style;
        display: flex;
        width: 100%;
        height: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        padding: 0 8px;
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
          .message {
            @include font.small;
          }
        }
      }
    }
  }
}
</style>
