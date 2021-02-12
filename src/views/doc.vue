<template>
  <div class="page-doc">
    <top-nav/>
    <div class="top-nav">
      <div class="logo"></div>
      <div class="menu"></div>
    </div>
    <div class="content">
      <aside>
        <h2>组件列表</h2>
        <ul>
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
        </ul>
      </aside>
      <main>主内容</main>
    </div>
  </div>
</template>

<script lang="ts">
import TopNav from '../components/top-nav.vue'

export default {
  name: "doc",
  components: {TopNav}
}
</script>

<style lang="scss" scoped>
.page-doc {
  aside {
    background: lightblue;
    width: 150px;
    position: fixed;
    top: 64px;
    left: 0;
    padding: 16px;

    > h2 {
      margin-bottom: 4px;
    }

    > ul {
      > li {
        padding: 4px 0;
      }
    }
  }
}
</style>