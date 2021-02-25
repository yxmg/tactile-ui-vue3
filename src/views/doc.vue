<template>
  <div class="page-doc">
    <top-nav class="nav" need-toggle-btn/>
    <div class="top-nav">
      <div class="logo"></div>
      <div class="menu"></div>
    </div>
    <div class="content">
      <aside v-if="asideVisible">
        <h2>文档</h2>
        <ol>
          <li>
            <router-link to="/doc/intro">关于Tiny UI</router-link>
          </li>
          <li>
            <router-link to="/doc/get-started">开始使用</router-link>
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
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import TopNav from '../components/top-nav.vue'
import {inject, Ref} from "vue";

export default {
  name: "doc",
  components: { TopNav },
  setup() {
    const asideVisible = inject<Ref<boolean>>('asideVisible')
    return { asideVisible }
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
  }

  > .content {
    display: flex;
    flex-grow: 1;
    padding-top: 60px;
    padding-left: 156px;
    @media (max-width: 600px) {
      padding-left: 0;
    }
  }

  main {
    flex-grow: 1;
    padding: 16px;
    background-color: #ffffff;
  }

  aside {
    flex-shrink: 0;
    background: lightblue;
    width: 150px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    padding: 80px 0 16px;
    height: 100%;

    > h2 {
      padding: 0 16px;
      margin-bottom: 4px;
    }

    > ol {
      > li {
        padding: 4px 0;

        > a {
          display: block;
          padding: 4px 16px;

          &.router-link-active {
            background-color: #D4DFE6;
          }
        }
      }
    }
  }
}
</style>