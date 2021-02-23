<template>
  <div class="top-nav">
    <span class="toggle-aside-btn" @click="toggleMenu">
      <i class="stroke"></i>
      <i class="stroke"></i>
      <i class="stroke"></i>
    </span>
    <router-link to="/">
      <div class="logo">
        <img class="img-logo" src="../assets/logo.png" alt="">
      </div>
    </router-link>

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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  height: 64px;

  .img-logo {
    width: 48px;
    height: 48px;
  }

  .toggle-aside-btn {
    display: none;
    cursor: pointer;

    > .stroke {
      display: block;
      width: 24px;
      height: 2px;
      border-radius: 2px;
      background-color: #000;

      & ~ .stroke {
        margin-top: 6px;
      }
    }
  }

  @media (max-width: 600px) {
    > .logo {
      margin: 0 auto;
    }

    > .toggle-aside-btn {
      display: inline-block;
    }
  }
}
</style>