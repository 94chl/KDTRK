<template>
  <h1>나에게 한🥚 없다....</h1>
</template>

<style lang="scss" scoped>
@use '~/scss/font';
@use '~/scss/color';
h1 {
  @include font.large;
  background-color: color.$egg-yellow;
  color: white;
  padding-top : 200px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom : 0;
  text-align: center;
}
</style>