<template>
  <router-view></router-view>
</template>

<script lang="ts">
import {ref, provide} from 'vue'
import router from './router/index'

export default {
  name: 'App',
  setup() {
    const width = document.documentElement.clientWidth
    const isMobile = width <= 600
    const asideVisible = ref(!isMobile)
    provide('asideVisible', asideVisible)

    router.afterEach(() => {
      if (isMobile) {
        asideVisible.value = false
      }
    })
  }
}
</script>
