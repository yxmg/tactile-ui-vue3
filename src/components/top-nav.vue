<template>
  <div class="top-nav">
    <span class="toggle-aside-btn" @click="toggleMenu" v-if="needToggleBtn">
      <i class="stroke"></i>
      <i class="stroke"></i>
      <i class="stroke"></i>
    </span>
    <router-link class="logo" to="/">
      <img class="img-logo" src="../assets/logo.png" alt="">
    </router-link>

    <div class="menu" v-if="needMenuBtn">
      <router-link to="/doc">文档</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import {inject, Ref} from 'vue'

export default {
  name: "top-nav",
  props: {
    needToggleBtn: {
      type: Boolean,
      default: false
    },
    needMenuBtn: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const asideVisible = inject<Ref<boolean>>('asideVisible')
    const toggleMenu = () => {
      asideVisible.value = !asideVisible.value
    }
    return { asideVisible, toggleMenu }
  }
}
</script>

<style lang="scss" scoped>
$padding-horizontal: 50px;

.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 $padding-horizontal;
  height: 64px;
  background-color: #fff;

  .img-logo {
    width: 48px;
    height: 48px;
  }

  .toggle-aside-btn {
    position: absolute;
    left: 15px;
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

  .menu {
    position: absolute;
    right: $padding-horizontal;
  }

  @media (max-width: 600px) {
    .logo {
      margin: 0 auto;
    }

    > .toggle-aside-btn {
      display: inline-block;
    }
  }
}
</style>