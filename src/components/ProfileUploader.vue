<template>
  <div class="uploader-container">
    <img
      class="img"
      :src="
        inputImageUrl ||
        profileUrl ||
        'https://media.vlpt.us/images/alajillo/post/3e818b53-8098-45bd-9c53-524ab9f4782a/user.png'
      "
    />
    <label for="uploader" class="custom-file-upload">
      <img
        class="uploadImg"
        src="https://media.vlpt.us/images/alajillo/post/c9266640-16d9-4ef2-9ee8-e9b991cc060f/cloud-computing.png"
      />
    </label>
    <input
      id="uploader"
      ref="inputImage"
      type="file"
      name="image"
      accept="image/*"
      @change="updateImg"
    />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import updateProfile from "~/api/updateProfile";
import { getUser } from "../storage/localStorage";
import userAuth from "../api/userAuth";
const sleep = function (time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });
};
export default {
  data() {
    return {
      inputImage: null,
      inputImageUrl: null,
      profileUrl: null,
    };
  },
  mounted() {
    const img = getUser().user.image;
    this.profileUrl = img;
  },
  methods: {
    async updateImg() {
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
      const newPostData = new FormData();
      newPostData.append("isCover", false);
      newPostData.append("image", this.inputImage);
      await updateProfile(newPostData);
      await sleep(5000);
      await userAuth();
      this.$router.go(0);
    },
  },
};
</script>

<style lang="scss" scoped>
.uploader-container {
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 50%;
  &:hover {
    .uploadImg {
      opacity: 0.5;
      z-index: 1;
    }
    .img {
      opacity: 0.2;
    }
  }
}
.img {
  border: 1px solid #ddd;
  box-sizing: border-box;
  object-fit: fill;
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
}
input {
  display: none;
}
.uploadImg {
  width: 50%;
  height: 50%;
  opacity: 0;
}
.custom-file-upload {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
}
</style>
