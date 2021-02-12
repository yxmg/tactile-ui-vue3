<template>
  <div class="page-home">
    <top-nav/>
    <div class="banner">
      <h1 class="title">Tiny UI</h1>
      <h2 class="desc">The UI library for Vue3 study</h2>
      <p class="actions">
        <a class="action-item" href="">Github</a>
        <router-link to="/doc" class="action-item">开始</router-link>
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

  .banner {
    padding: 300px 0;
  }

  .title {
    margin-bottom: 24px;
  }
  .desc {
    margin-bottom: 24px;
  }

  .action-item {
    & ~ .action-item {
      margin-left: 24px;
    }
  }

}
</style>