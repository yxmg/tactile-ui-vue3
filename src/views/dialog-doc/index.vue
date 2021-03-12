<template>
  <div class="dialog-doc">
    <h1>Dialog 组件示例 </h1>
    <Demo :component="normalDemo"></Demo>
    <Demo :component="customDemo"></Demo>
    <Demo :component="closableDemo"></Demo>
    <Demo :component="draggableDemo"></Demo>
  </div>
</template>

<script lang="ts">
import Demo from '../../components/demo.vue'
import normalDemo from './components/normal-demo.vue'
import customDemo from './components/custom-demo.vue'
import closableDemo from './components/closable-demo.vue'
import draggableDemo from './components/draggable-demo.vue'

export default {
  name: "dialog-doc",
  components: { Demo },
  setup() {
    return { normalDemo, customDemo, closableDemo, draggableDemo }
  }
}
</script>
<style>
</style>