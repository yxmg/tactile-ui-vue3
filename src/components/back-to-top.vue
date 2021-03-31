<template>
  <transition name="dialog-transition">
    <div class="back-to-top" v-if="visible" @click="scrollToTop">
      <svg class="icon">
        <use :xlink:href="`#icon-vertical-align-top`"></use>
      </svg>
    </div>
  </transition>
</template>

<script>
import { ref } from 'vue'

export default {
  name: "back-to-top.vue",
  props: {
    scrollThreshold: {
      type: Number,
      default: 200
    }
  },
  setup(props) {
    const visible = ref(false)
    const updateVisible = () => {
      const scrollTop = document.documentElement.scrollTop
      visible.value = scrollTop > props.scrollThreshold
    }
    updateVisible()
    window.addEventListener('scroll', updateVisible)

    const scrollToTop = () => {
      document.documentElement.scrollTop = 0
    }
    return { visible, scrollToTop }
  }
}
</script>

<style lang="scss" scoped>
.back-to-top {
  position: fixed;
  right: 100px;
  bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
  border-radius: 50%;
  z-index: 6;
  margin-bottom: 0;
  transform-origin: center center;
  background-color: #FFB300;
  color: #fff;
  font-size: 32px;
  cursor: pointer;

  @media (max-width: 600px) {
    right: 50px;
    bottom: 50px;
  }
}


</style>