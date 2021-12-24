<template>
  <button @click="showLetter">
    <img src="../img/message.png" alt="message" />
  </button>
</template>

<script>
import { getUser } from "../storage/localStorage";
export default {
  props: {
    receiver: Object,
  },
  methods: {
    showLetter() {
      const { token, user } = getUser();
      if (!token) {
        this.$store.dispatch("modal/onModal", "login");
        return;
      }
      if (this.receiver._id === user._id) {
        alert("자기한테 편지 쓰면 안되요😯");
        return;
      }
      this.$store.dispatch("letter/changeReceiver", this.receiver._id);
      this.$store.dispatch("letter/onLetter");
    },
  },
};
</script>

<style lang="scss" scoped>
@use "~/scss/font";
@use "~/scss/button";

button {
  @include font.medium;
  @include button.default-style;
  width: 160px;
  height: 40px;
  cursor: pointer;
}
</style>
