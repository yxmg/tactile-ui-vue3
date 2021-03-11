<template>
  <div class="switch-doc">
    <h1>Tabs 组件示例 </h1>
    <Demo :component="normalDemo"></Demo>
  </div>
</template>

<script lang="ts">
import Demo from '../../components/demo.vue'
import normalDemo from './components/normal-demo.vue'

export default {
  name: "tabs-doc",
  components: { Demo },
  setup() {
    return { normalDemo }
  }
}
</script>
<style>
.t-switch {
  margin-right: 6px;
}
</style>