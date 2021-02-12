<template>
  <div class="page-doc">
    <top-nav />
    <div class="top-nav">
      <div class="logo"></div>
      <div class="menu"></div>
    </div>
    <div class="content">
      <aside>边栏</aside>
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

<style scoped>

</style>