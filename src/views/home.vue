<template>
  <main class="page-home">
    <div class="stripes">
      <div class="stripe s1"></div>
      <div class="stripe s2"></div>
      <div class="stripe s3"></div>
    </div>
    <section class="content"></section>
    <div class="road-map">
      <div class="roads">
        <div class="surface-roads"></div>
      </div>
    </div>
    <div class="triangle">
      <img src="../assets/triangle.svg" alt="">
    </div>
  </main>
</template>

<script>
export default {
  name: "home"
}
</script>

<style lang="scss" scoped>
.page-home {
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
    margin: 190px auto 0;
    max-width: 1040px;
    z-index: 1;
    text-align: center;
    will-change: transform;
    width: 100%;
    padding: 0px 20px;
  }

  .triangle {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: -8px;
    filter: drop-shadow(rgba(165, 140, 126, 0.15) 0 0 10px);
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
</style>