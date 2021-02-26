<template>
  <div class="page-home">
    <div class="top-part">
      <top-nav need-menu-btn/>
      <div class="banner">
        <h1 class="title">Tiny UI</h1>
        <h2 class="desc">The UI library for Vue3 study</h2>
        <p class="actions">
          <a class="action-item" href="">Github</a>
          <router-link class="action-item" to="/doc">开始</router-link>
        </p>
      </div>
    </div>
    <ul class="features">
      <li class="feature-item">
        <svg class="icon">
          <use xlink:href="#icon-vue"></use>
        </svg>
        <h3 class="feature-title">基于 Vue 3</h3>
        <p class="feature-desc">Vue 3 Composition API</p>
      </li>
      <li class="feature-item">
        <svg class="icon">
          <use xlink:href="#icon-typescript"></use>
        </svg>
        <h3 class="feature-title">基于 TypeScript </h3>
        <p class="feature-desc">使用 TypeScript</p>
      </li>
      <li class="feature-item">
        <svg class="icon">
          <use xlink:href="#icon-light"></use>
        </svg>
        <h3 class="feature-title">代码易读</h3>
        <p class="feature-desc">简洁明了的源代码</p>
      </li>
    </ul>
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
  overflow: hidden;

  .top-part {
    color: $font-color;
    background: linear-gradient(145deg, rgba(227, 255, 253, 1) 0%, rgba(183, 233, 230, 1) 100%);
    clip-path: ellipse(80% 60% at 50% 40%);
    text-align: center;
  }

  .banner {
    padding: 250px 0;
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

  .features {
    margin: 64px auto;
    padding: 0 16px;
    display: flex;
    flex-wrap: wrap;

    .feature-item {
      width: 100%;
      margin: 16px 0;
      display: grid;
      justify-content: start;
      align-content: space-between;
      grid-template-areas:
        "icon title"
        "icon text";
      grid-template-columns: 80px auto;
      grid-template-rows: 1fr auto;


      .icon {
        grid-area: icon;
        width: 64px;
        height: 64px;
      }

      .feature-title {
        grid-area: title;
        font-size: 28px;
      }

      .feature-desc {
        grid-area: text
      }
    }

    @media (min-width: 800px) {
      width: 800px;
      .feature-item {
        width: 50%;
      }
    }
    @media (min-width: 1200px) {
      width: 1200px;
      .feature-item {
        width: 33.3%;
      }
    }
  }
}
</style>