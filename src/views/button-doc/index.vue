<template>
  <div class="button-doc">
    <h1>Button 组件示例 </h1>
    <Demo :component="themeDemo"></Demo>
    <Demo :component="sizeDemo"></Demo>
    <Demo :component="disabledDemo"></Demo>
  </div>
</template>

<script lang="ts">
import Demo from '../../components/Demo.vue'
import themeDemo from './components/theme-demo.vue'
import sizeDemo from './components/size-demo.vue'
import disabledDemo from './components/disabled-demo.vue'

export default {
  name: "button-doc",
  components: { Demo },
  setup() {
    return { themeDemo, sizeDemo, disabledDemo }
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