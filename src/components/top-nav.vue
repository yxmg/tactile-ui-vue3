<template>
  <div class="top-nav">
    <div class="logo">
      <img class="img-logo" src="../assets/logo.png" alt="">
    </div>
    <div class="menu">
      <a href="">菜单1</a>
      |
      <a href="">菜单2</a>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "top-nav"
}
</script>

<style lang="scss" scoped>
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  height: 64px;
  background-color: lightcoral;

  .img-logo {
    width: 48px;
    height: 48px;
  }
}
</style>