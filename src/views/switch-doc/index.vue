<template>
  <div class="switch-doc">
    <h1>Switch 组件示例 </h1>
    <Demo :component="normalDemo"></Demo>
    <Demo :component="colorDemo"></Demo>
    <Demo :component="valueDemo"></Demo>
    <Demo :component="sizeDemo"></Demo>
    <Demo :component="disabledDemo"></Demo>
    <Demo :component="loadingDemo"></Demo>
    <Demo :component="contentDemo"></Demo>
    <Demo :component="keyboardDemo"></Demo>
  </div>
</template>

<script lang="ts">
import normalDemo from './components/normal-demo.vue'
import disabledDemo from './components/disabled-demo.vue'
import sizeDemo from './components/size-demo.vue'
import loadingDemo from './components/loading-demo.vue'
import colorDemo from './components/color-demo.vue'
import contentDemo from './components/content-demo.vue'
import valueDemo from './components/value-demo.vue'
import keyboardDemo from './components/keyboard-demo.vue'
import Demo from '../../components/demo.vue'

export default {
  name: "switch-doc",
  components: { Demo },
  setup() {
    return { normalDemo, disabledDemo, sizeDemo, loadingDemo, colorDemo, contentDemo, valueDemo, keyboardDemo }
  }
}
</script>
<style>
.t-switch {
  margin-right: 6px;
}
</style>