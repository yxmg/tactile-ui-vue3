<template>
  <div class="page-home">
    <top-nav class="page-header"></top-nav>

    <main class="page-main">
      <div class="stripes">
        <div class="stripe s1"></div>
        <div class="stripe s2"></div>
        <div class="stripe s3"></div>
      </div>
      <section class="content container-lg">
        <h2 class="page-title">Tactile UI</h2>
        <div class="page-title-desc">一个富有质感的UI组件库，基于Vue3和Typescript</div>
        <div class="btn-group">
          <a class="home-btn primary" href="/#/doc/get-started">快速上手</a>
          <a class="home-btn primary" href="https://github.com/yxmg/tactile-ui-vue3">Github</a>
        </div>

      </section>
      <div class="road-map">
        <div class="roads">
          <div class="surface-roads"></div>
        </div>
      </div>
      <div class="triangle" v-if="false">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 273" width="100%">
          <polygon fill="#FFFFFF" points="1280 1 1280 273 0 273"></polygon>
        </svg>
      </div>
    </main>
    <footer class="page-footer">
      &copy; 2021-2021 YXMG. All Rights Reserved.
    </footer>
  </div>
</template>

<script>
import topNav from '../components/top-nav.vue'

export default {
  name: "home",
  components: { topNav }
}
</script>

<style lang="scss" scoped>
.page-main {
  position: relative;
  background: linear-gradient(-180deg, #f6bf4e 1%, #f9d281 23%, #fffdf3 71%);
  overflow: hidden;

  .stripes {
    position: absolute;
    width: 100%;
    height: 100%;
    top: -80px;
    transform: skewY(-12deg);

    > .stripe {
      position: absolute;
      height: 190px;
    }

    > .s1 {
      top: 0;
      left: 0;
      width: 30%;
      background: linear-gradient(90deg, #ffad5a, rgba(250, 175, 82, .25));
    }

    > .s2 {
      top: 190px;
      left: 0;
      width: 38%;
      background: linear-gradient(90deg, #ffcd68, rgba(255, 199, 107, 0));
    }

    > .s3 {
      top: 380px;
      right: 0;
      width: 36%;
      background: linear-gradient(90deg, hsla(46, 98%, 78%, 0), #ffda84);
    }
  }

  .road-map {
    position: relative;
    width: 100%;
    height: 500px;
    perspective: 500px;
    -webkit-perspective: 500px;
    -webkit-mask-image: linear-gradient(-180deg, transparent, #000 35%);
    pointer-events: none;

    .roads {
      position: absolute;
      width: calc(100% + 1000px);
      height: 100%;
      left: -500px;
      transform: rotateX(41deg);
    }

    .surface-roads {
      position: absolute;
      width: 100%;
      height: 1300px;
      top: -125px;
      background-image: url('../assets/roads.svg');
      background-position: 50%;
      transform: translateY(-650px);
      animation: roads 10s linear infinite;
    }
  }

  .content {
    position: relative;
    margin-top: 190px;
    max-width: 1200px;
    z-index: 1;
    text-align: center;
    will-change: transform;
    width: 100%;
    padding: 0 20px;

    .page-title {
      font-size: 48px;
      font-weight: 700;
      line-height: 1;
      color: #7c0e3e;
    }

    .page-title-desc {
      margin-top: 15px;
      color: #7c0e3e;
    }
  }

  .triangle {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: -8px;
    filter: drop-shadow(rgba(165, 140, 126, 0.15) 0 0 10px);
  }

  .btn-group {
    margin-top: 25px;
  }

  .home-btn {
    white-space: nowrap;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    padding: 0 14px;
    box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
    background: #fff;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .025em;
    color: #6772e5;
    text-decoration: none;
    transition: all .15s ease;
    cursor: pointer;

    &.primary {
      color: #fff;
      background: #6772e5;
    }

    & ~ .home-btn {
      margin-left: 15px;
    }
  }

  @keyframes roads {
    0% {
      transform: translateY(-650px)
    }

    to {
      transform: translateY(0)
    }
  }
}

.page-footer {
  width: 100%;
  padding-top: 40px;
  padding-bottom: 20px;
  text-align: center;
  color: #525f7f;
}

.container-lg {
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 600px) {
  .page-main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    > .road-map {
      flex: auto;
    }
  }
  .page-footer {
    display: none;
  }
}
</style>