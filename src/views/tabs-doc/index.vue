<template>
  <div class="switch-doc">
    <h1>Tabs 组件示例 </h1>
    <Demo :component="normalDemo"></Demo>
    <Demo :component="iconDemo"></Demo>
    <Demo :component="customTitleDemo"></Demo>
    <Demo :component="disabledDemo"></Demo>
    <Demo :component="verticalDemo"></Demo>
    <Demo :component="overflowDemo"></Demo>
  </div>
</template>

<script lang="ts">
import Demo from '../../components/demo.vue'
import normalDemo from './components/normal-demo.vue'
import disabledDemo from './components/disabled-demo.vue'
import iconDemo from './components/icon-demo.vue'
import customTitleDemo from './components/custom-title-demo.vue'
import verticalDemo from './components/vertical-demo.vue'
import overflowDemo from './components/overflow-demo.vue'

export default {
  name: "tabs-doc",
  components: { Demo },
  setup() {
    return { normalDemo, disabledDemo, iconDemo, customTitleDemo, verticalDemo, overflowDemo }
  }
}
</script>
<style>
.t-switch {
  margin-right: 6px;
}
</style>