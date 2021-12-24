<template>
  <div class="container">
    <label :for="name">
      {{ name }}
    </label>
    <input
      :id="name"
      :value="text"
      :type="type"
      :name="name"
      :required="require"
      @input="onInput"
    />
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: [String, Array],
        default: "",
      },
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      require: {
        type: Boolean,
        default: true,
      },
    },
    methods: {
      onInput(event) {
        this.$emit("update:text", event.target.value);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @use "~/scss/font";
  @use "~/scss/button";
  @use "~/scss/color";

  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    margin: 8px 0;
    label {
      text-align: center;
      font-weight: 700;
    }

    input {
      @include button.default-style;
      text-align: center;
      width: 200px;
      height: 30px;
      background: #fff;
      border: 1px solid color.$egg-yellow;
      color: #000;
      font-weight: 400;

      &:focus {
        background: color.$egg-yellow;
        color: #fff;
      }
    }
  }
</style>
