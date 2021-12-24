<template>
  <button
    class="go-main"
    @click="goMain">
    <slot></slot>
  </button>
</template>

<script>
export default {
	methods: {
		goMain() {
			this.$router.replace({ name: "main" });
		}
	}
};
</script>