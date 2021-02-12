<template>
  <router-view></router-view>
</template>

<script lang="ts">
import {ref, provide} from 'vue'

export default {
  name: 'App',
  setup() {
    const width = document.documentElement.clientWidth
    const isMobile = width <= 600
    const asideVisible = ref(!isMobile)
    provide('asideVisible', asideVisible)
  }
}
</script>
