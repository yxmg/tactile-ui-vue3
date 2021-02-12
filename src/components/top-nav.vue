<template>
  <div class="top-nav">
    <div class="logo" @click="toggleMenu">
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
import {inject, Ref} from 'vue'

export default {
  name: "top-nav",
  setup() {
    const asideVisible = inject<Ref<boolean>>('asideVisible')
    const toggleMenu = () => {
      asideVisible.value = !asideVisible.value
    }
    return {asideVisible, toggleMenu}
  }
}
</script>

<style lang="scss" scoped>
.top-nav {
  position: relative;
  z-index: 1;
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