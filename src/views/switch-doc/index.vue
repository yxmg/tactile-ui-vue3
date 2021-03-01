<template>
  <div class="switch-doc">
    <h1>Switch 组件示例 </h1>
    <Demo :component="normalDemo"></Demo>
    <Demo :component="disabledDemo"></Demo>
    <Demo :component="sizeDemo"></Demo>
  </div>
</template>

<script lang="ts">
import normalDemo from './components/normal-demo.vue'
import disabledDemo from './components/disabled-demo.vue'
import sizeDemo from './components/size-demo.vue'
import Demo from '../../components/demo.vue'

export default {
  name: "switch-doc",
  components: { Demo },
  setup() {
    return { normalDemo, disabledDemo, sizeDemo }
  }
}
</script>