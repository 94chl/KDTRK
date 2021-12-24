<template>
  <div class="app__main">
    <div class="main__title">게시글 수정 페이지</div>
    <div class="main__update-post">
      <form class="update-post__form" @submit.prevent>
        <div class="form__img">
          <div class="img__preview">
            <img
              :src="
                inputImageUrl
                  ? inputImageUrl
                  : 'https://res.cloudinary.com/dyt02nbtq/image/upload/v1635252224/post/91f4c013-2780-4824-8af0-632ec94b15d8.png'
              "
            />
          </div>
          <div class="img__input">
            <input
              ref="inputImage"
              type="file"
              name="image"
              accept="image/*"
              @change="showPreviewImage"
            />
          </div>
        </div>
        <div class="form__input">
          <div class="form__title">
            <label for="title">제목</label>
            <input
              ref="title"
              :value="postTitle"
              name="title"
              placeholder="제목을 작성해주세요."
              @input="postTitle = $event.target.value"
            />
          </div>
          <div class="form__content">
            <label for="content">내용</label>
            <textarea
              ref="content"
              :value="postContent"
              name="content"
              placeholder="내용을 작성해주세요."
              @change="postContent = $event.target.value"
            >
            </textarea>
          </div>
          <div class="form__else">
            <div class="form__price">
              <label for="price">가격(원)</label>
              <input
                ref="price"
                :value="postPrice"
                name="price"
                placeholder="-"
                @input="postPrice = $event.target.value"
              />
            </div>
            <div class="form__target-number">
              <label for="targetNumber">모집인원(명)</label>
              <input
                ref="targetNumber"
                :value="postTargetNumber"
                name="targetNumber"
                placeholder="-"
                @input="postTargetNumber = $event.target.value"
              />
            </div>
          </div>
          <div class="form__perPrice">
            <div>1인당 가격:</div>
            <div class="show-price">&nbsp{{ perPrice }}</div>
          </div>
        </div>
        <p class="form__button">
          <button type="submit" @click="updatePost">수정</button>
          <GoMainBtn> 취소 </GoMainBtn>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const post = this.$store.state.posts.post;
    return {
      postId: this.$route.params.id,
      postTitle: post.title ? JSON.parse(post.title).title : "",
      postContent: post.title ? JSON.parse(post.title).content : "",
      inputImage: null,
      inputImageUrl: post.image,
      postPrice: post.title ? JSON.parse(post.title).price : "",
      postTargetNumber: post.title ? JSON.parse(post.title).targetNumber : "",
      perPrice: post.title
        ? JSON.parse(post.title).price /
          (parseInt(JSON.parse(post.title).targetNumber) + 1)
        : "",
    };
  },
  watch: {
    //NOTE 숫자만 입력되도록 함.
    postPrice(input) {
      this.postPrice = input.replace(/[^0-9]/g, "");
    },
    postTargetNumber(input) {
      this.postTargetNumber = input.replace(/[^0-9]/g, "");
    },
  },
  created() {
    console.log("불러온 게시글 데이터", this.$store.state.posts.post);
  },
  methods: {
    updatePost() {
      //NOTE 작성 안된 곳이 있을 경우 focus 주기
      if (!this.postTitle) {
        this.$refs.title.focus();
        return;
      } else if (!this.postContent) {
        this.$refs.content.focus();
        return;
      } else if (!this.postPrice) {
        this.$refs.price.focus();
        return;
      } else if (!this.postTargetNumber) {
        this.$refs.targetNumber.focus();
        return;
      }
      const updatedPostData = new FormData();
      const userInputs = {
        title: this.postTitle,
        content: this.postContent,
        price: this.postPrice,
        targetNumber: this.postTargetNumber,
      };

      updatedPostData.append("postId", this.postId);
      updatedPostData.append("title", JSON.stringify(userInputs));
      updatedPostData.append("image", this.inputImage);
      updatedPostData.append("channelId", "616a204e22996f0bc94f6e1d");

      this.$store.dispatch("posts/updatePost", updatedPostData);
      this.$router.replace({ name: "main" });
    },
    showPreviewImage() {
      let inputEl = this.$refs.inputImage;

      let file = inputEl.files[0];
      this.inputImage = file;

      let fileExt = file.name.substring(file.name.lastIndexOf(".") + 1);
      fileExt = fileExt.toLowerCase();

      if (["jpeg", "jpg", "png", "gif", "jfif"].includes(fileExt)) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.inputImageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped lang="scss">
label {
  margin-bottom: 10px;
}
input:focus,
textarea:focus {
  outline: none;
  background-color: #ffcd58;
}
input::placeholder,
textarea::placeholder {
  color: lightgray;
}
.app__main {
  /*NOTE header높이 : 54px */
  height: calc(100vh - 54px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
    .img__preview {
      width: 280px;
      height: 280px;
    }
    .form__input {
      width: 80%;
      margin: auto;
    }
    .form__else {
      flex-direction: column;
    }
  }
  @media screen and (min-width: 480px) and(max-width: 768px) {
    margin: auto;
    width: 100%;
    .img__preview {
      width: 280px;
      height: 280px;
    }
    .form__else {
      flex-direction: column;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 100%;
    .update-post__form {
      grid-template-columns: 1fr 1.3fr;
      grid-template-rows: 450px;
    }
    .img__preview {
      width: 280px;
      height: 280px;
    }
    .form__input {
      width: 90%;
      margin: auto;
    }
    .form__else > div {
      width: 180px;
    }
    .form__button {
      grid-column: span 2;
    }
  }
  @media screen and (min-width: 1024px) {
    width: 1024px;
    .update-post__form {
      grid-template-columns: 1fr 1.3fr;
      grid-template-rows: 450px;
    }
    .img__preview {
      width: 320px;
      height: 320px;
    }
    .form__input {
      width: 90%;
      margin: auto;
    }
    .form__else > div {
      width: 250px;
    }
    .form__button {
      grid-column: span 2;
    }
  }
}
.main__title {
  color: gray;
  font-size: 20px;
  line-height: 30px;
  padding: 14px 0;
}
.main__update-post {
  flex-grow: 1;
  .update-post__form {
    display: grid;
    align-items: center;
    .form__img {
      margin: auto;
      display: flex;
      flex-direction: column;
      .img__preview {
        border: 2px solid #ffcd58;
        border-radius: 20px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .img__input {
        display: flex;
        justify-content: center;
        padding-top: 30px;
        input {
          width: 180px;
        }
      }
    }
    .form__input {
      display: grid;
      grid-template-columns: 1fr 1fr;
      .form__title {
        grid-column: span 2;
        margin: 14px 0 0 0;
        display: flex;
        flex-direction: column;
        input {
          height: 20px;
          padding: 15px 10px;
          border: 2px solid #ffcd58;
          border-radius: 20px;
        }
      }
      .form__content {
        grid-column: span 2;
        margin-top: 14px;
        display: flex;
        flex-direction: column;
        textarea {
          height: 150px;
          resize: none;
          padding: 10px;
          border: 2px solid #ffcd58;
          border-radius: 20px;
        }
      }
      .form__else {
        grid-column: span 2;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 14px;
        .form__price {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          input {
            height: 20px;
            padding: 15px 10px;
            border: 2px solid #ffcd58;
            border-radius: 20px;
          }
        }
        .form__target-number {
          display: flex;
          flex-direction: column;
          input {
            height: 20px;
            padding: 15px 10px;
            border: 2px solid #ffcd58;
            border-radius: 20px;
          }
        }
      }
      .form__perPrice {
        grid-column-start: 2;
        grid-column-end: 3;
        margin-top: 14px;
        font-weight: 700;
        color: orangered;
        display: flex;
        justify-content: flex-end;
      }
    }
    .form__button {
      margin: auto;
      padding-top: 40px;
      button,
      .img__input {
        color: white;
        font-weight: 700;
        border: none;
        border-radius: 20px;
        background-color: #ffcd58;
        padding: 5px 20px;
        margin: 5px;
        &:hover {
          cursor: pointer;
          filter: brightness(80%);
        }
      }
    }
  }
}
</style>
