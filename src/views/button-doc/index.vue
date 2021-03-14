<template>
  <div class="button-doc">
    <h1>Button 按钮 </h1>
    <Demo :component="themeDemo"></Demo>
    <Demo :component="iconDemo"></Demo>
    <Demo :component="sizeDemo"></Demo>
    <Demo :component="disabledDemo"></Demo>
    <Demo :component="loadingDemo"></Demo>
    <Demo :component="blockDemo"></Demo>
    <Demo :component="keyboardDemo"></Demo>
  </div>
</template>

<script lang="ts">
import Demo from '../../components/Demo.vue'
import themeDemo from './components/theme-demo.vue'
import sizeDemo from './components/size-demo.vue'
import disabledDemo from './components/disabled-demo.vue'
import loadingDemo from './components/loading-demo.vue'
import blockDemo from './components/block-demo.vue'
import iconDemo from './components/icon-demo.vue'
import keyboardDemo from './components/keyboard-demo.vue'

export default {
  name: "button-doc",
  components: { Demo },
  setup() {
    return { themeDemo, sizeDemo, disabledDemo, loadingDemo, blockDemo, iconDemo, keyboardDemo }
  }
}
</script>

<style lang="scss" scoped>
.button-doc {
  ::v-deep(.t-button) {
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
</style>