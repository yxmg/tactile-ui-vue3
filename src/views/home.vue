<template>
  <div class="page-home">
    <top-nav/>
    <div class="banner">
      <h1>Tiny UI</h1>
      <h2>The UI library for Vue3 study</h2>
      <p class="actions">
        <a href="">Github</a>
        |
        <a href="">开始</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import TopNav from '../components/top-nav.vue'

export default {
  name: "home",
  components: {TopNav}
}
</script>

<style lang="scss" scoped>
.page-home {
  text-align: center;
}
</style>