<template>
  <div class="page-doc">
    <top-nav class="nav" need-toggle-btn/>
    <div class="content">
      <transition name="slide-to-right">
        <aside
          ref="wrapper"
          v-show="asideVisible"
          @clickOutside="handleClickOutside"
          data-outside-exclude=".toggle-aside-btn"
        >
          <h2>文档</h2>
          <ol>
            <li>
              <router-link to="/doc/intro">关于Tactile UI</router-link>
            </li>
            <li>
              <router-link to="/doc/get-started">快速上手</router-link>
            </li>
            <li>
              <router-link to="/doc/playground">在线演示</router-link>
            </li>
          </ol>
          <h2>组件列表</h2>
          <ol>
            <li>
              <router-link to="/doc/switch">Switch 组件</router-link>
            </li>
            <li>
              <router-link to="/doc/button">Button 组件</router-link>
            </li>
            <li>
              <router-link to="/doc/dialog">Dialog 组件</router-link>
            </li>
            <li>
              <router-link to="/doc/tabs">Tabs 组件</router-link>
            </li>
          </ol>
        </aside>
      </transition>
      <main>
        <router-view></router-view>
      </main>
    </div>
    <back-to-top></back-to-top>
  </div>
</template>

<script lang="ts">
import TopNav from '../components/top-nav.vue'
import BackToTop from '../components/back-to-top.vue'
import {inject, Ref} from "vue";
import {useClickOutside} from '../plugins/use-click-outside'

export default {
  name: "doc",
  components: { TopNav, BackToTop },
  setup() {
    const asideVisible = inject<Ref<boolean>>('asideVisible')
    const wrapper = useClickOutside()
    const handleClickOutside = (event) => {
      if (document.documentElement.clientWidth < 600) {
        asideVisible.value = false
      }
    }
    return { asideVisible, wrapper, handleClickOutside }
  }
}
</script>

<style lang="scss" scoped>
.page-doc {
  display: flex;
  flex-direction: column;
  height: 100vh;

  > .nav {
    flex-shrink: 0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .15);
    background: #fff;
  }

  ::v-deep(.navigator) {
    max-width: none;
    padding: 0 100px 0 40px;
  }

  > .content {
    display: flex;
    flex-grow: 1;
    padding-top: 60px;
    padding-left: 246px;
    @media (max-width: 600px) {
      padding-left: 0;
    }
  }

  main {
    flex-grow: 1;
    overflow: hidden;
    padding: 16px;
    background-color: #ffffff;
  }

  aside {
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .15);
    flex-shrink: 0;
    width: 240px;
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    padding: 70px 0 16px;
    height: 100%;

    > h2 {
      padding: 10px 16px;
    }

    > ol {
      > li {
        padding: 4px 0;

        > a {
          display: block;
          padding: 10px 24px;
          transition: .3s cubic-bezier(.25, .8, .5, 1);

          &.router-link-active {
            color: #FFB300;
            background-color: fade_out(#FFB300, 0.8);
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.slide-to-right-enter-active,
.slide-to-right-leave-active {
  transition: .3s cubic-bezier(.25, .8, .5, 1);
}

.slide-to-right-enter-from,
.slide-to-right-leave-to {
  transform: translateX(-100%)
}
</style>