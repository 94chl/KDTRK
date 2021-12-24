<template>
  <div class="app__main">
    <div class="main__title">포스트 작성</div>
    <div class="main__create-post">
      <form class="create-post__form" @submit.prevent>
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
              :value="inputTitle"
              name="title"
              placeholder="제목을 작성해주세요."
              @input="inputTitle = $event.target.value"
            />
          </div>
          <div class="form__content">
            <label for="content">내용</label>
            <textarea
              ref="content"
              :value="inputContent"
              name="content"
              placeholder="내용을 작성해주세요."
              @change="inputContent = $event.target.value"
            >
            </textarea>
          </div>
          <div class="form__else">
            <div class="form__price">
              <label for="price">가격(원)</label>
              <input
                ref="price"
                :value="inputPrice"
                name="price"
                placeholder="-"
                @input="inputPrice = $event.target.value"
              />
            </div>
            <div class="form__target-number">
              <label for="targetNumber">모집인원(명)</label>
              <input
                ref="targetNumber"
                :value="inputTargetNumber"
                name="targetNumber"
                placeholder="-"
                @input="inputTargetNumber = $event.target.value"
              />
            </div>
          </div>
          <div class="form__perPrice">
            <div>1인당 가격:</div>
            <div class="show-price">&nbsp{{ perPrice }}</div>
          </div>
        </div>
        <p class="form__button">
          <button type="submit" @click="createPost">저장</button>
          <GoMainBtn> 취소 </GoMainBtn>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputTitle: "",
      inputContent: "",
      inputPrice: null,
      inputTargetNumber: null,
      inputImage: null,
      inputImageUrl: null,
    };
  },
  computed: {
    perPrice() {
      if (this.inputPrice && this.inputTargetNumber) {
        const calculatedPrice =
          this.inputPrice / (parseInt(this.inputTargetNumber) + 1);
        return calculatedPrice + "원";
      } else {
        return "";
      }
    },
  },
  inputTargetNumber(input) {
    this.inputTargetNumber = input.replace(/[^0-9]/g, "");
  },
  methods: {
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
    createPost() {
      //NOTE 작성 안된 곳이 있을 경우 focus 주기
      if (!this.inputTitle) {
        this.$refs.title.focus();
        return;
      } else if (!this.inputContent) {
        this.$refs.content.focus();
        return;
      } else if (!this.inputPrice) {
        this.$refs.price.focus();
        return;
      } else if (!this.inputTargetNumber) {
        this.$refs.targetNumber.focus();
        return;
      }
      const newPostData = new FormData();
      const userInputs = {
        title: this.inputTitle,
        content: this.inputContent,
        price: this.inputPrice,
        targetNumber: this.inputTargetNumber,
      };

      newPostData.append("title", JSON.stringify(userInputs));
      newPostData.append("image", this.inputImage);
      newPostData.append("channelId", "6182ac41e1ecd063dabf10e0");

      this.$store.dispatch("posts/createPost", newPostData);
      this.$router.replace({ name: "main" });
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
      width: 160px;
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
.main__create-post {
  flex-grow: 1;
  .create-post__form {
    display: grid;
    align-items: center;
    padding: 14px;
    .form__img {
      margin: auto;
      display: flex;
      flex-direction: column;
      .img__preview {
        /* width: 320px;
                        height: 320px; */
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
