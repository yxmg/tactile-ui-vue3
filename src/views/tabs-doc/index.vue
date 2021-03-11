<template>
  <div class="switch-doc">
    <h1>Tabs 组件示例 </h1>
    <Demo :component="normalDemo"></Demo>
    <Demo :component="iconDemo"></Demo>
    <Demo :component="disabledDemo"></Demo>
    <Demo :component="customTitleDemo"></Demo>
  </div>
</template>

<script lang="ts">
import Demo from '../../components/demo.vue'
import normalDemo from './components/normal-demo.vue'
import disabledDemo from './components/disabled-demo.vue'
import iconDemo from './components/icon-demo.vue'
import customTitleDemo from './components/custom-title-demo.vue'

export default {
  name: "tabs-doc",
  components: { Demo },
  setup() {
    return { normalDemo, disabledDemo, iconDemo, customTitleDemo }
  }
}
</script>
<style>
.t-switch {
  margin-right: 6px;
}
</style>