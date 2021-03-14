<template>
  <div class="top-nav">
    <div class="navigator">
      <span class="toggle-aside-btn" @click="toggleMenu" v-if="needToggleBtn">
      <i class="stroke"></i>
      <i class="stroke"></i>
      <i class="stroke"></i>
    </span>
      <router-link class="logo" to="/">
        <img class="logo-img" src="../assets/logo.png" alt="">
        <span class="logo-text">Tactile UI</span>
      </router-link>
      <div class="center-part"></div>
      <div class="right-part">
        <router-link class="right-link doc-link" to="/doc">文档</router-link>
        <router-link class="right-link" to="/">关于我</router-link>
        <a class="icon-link" href="https://github.com/yxmg">
          <svg class="icon">
            <use :xlink:href="`#icon-github`"></use>
          </svg>
        </a>
      </div>
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

.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 4;

  .navigator {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    max-width: 1200px;
    height: 64px;
  }

  .center-part {
    flex: auto;
  }

  .right-part {
    font-size: 16px;
  }

  .right-link {
    padding: 0 20px;
    color: #b5562b;

    &:hover {
      color: #7c0e3e
    }

    &.router-link-active {
      color: #7c0e3e
    }
  }

  .icon-link {
    padding-left: 20px;
    font-size: 24px;
  }

  .logo {
    display: flex;
    align-items: center;

    .logo-img {
      width: 36px;
      height: 36px;
      margin-right: 5px;
    }

    .logo-text {
      font-size: 20px;
      font-weight: 600;
      color: #b5562b;
    }
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
    right: 50px;
  }

  @media (max-width: 600px) {
    box-shadow: 0 0 3px rgba(0, 0, 0, .25);
    background-color: #fff;

    .navigator {
      height: 48px;
      justify-content: center;
    }

    .right-part, .center-part {
      display: none;
    }

    .logo {
      margin-left: -16px;

      .logo-img {
        width: 32px;
        height: 32px;
      }
    }


    > .toggle-aside-btn {
      display: inline-block;
    }

    .menu {
      right: 15px;
    }
  }
}
</style>