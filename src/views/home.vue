<template>
  <div class="page-home">
    <top-nav/>
    <div class="banner">
      <h1 class="title">Tiny UI</h1>
      <h2 class="desc">The UI library for Vue3 study</h2>
      <p class="actions">
        <a class="action-item" href="">Github</a>
        <router-link class="action-item" to="/doc">开始</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import TopNav from '../components/top-nav.vue'

export default {
  name: "home",
  components: { TopNav }
}
</script>

<style lang="scss" scoped>
$green: #02bcc0;
$border-radius: 4px;
$font-color: #007974;

.page-home {
  color: $font-color;
  background: linear-gradient(145deg, rgba(227, 255, 253, 1) 0%, rgba(183, 233, 230, 1) 100%);
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
    background-color: $green;
    display: inline-block;
    color: #fff;
    padding: 8px 24px;
    border-radius: $border-radius;

    &:hover {
      text-decoration: none;
    }

    & ~ .action-item {
      margin-left: 24px;
    }
  }

}
</style>