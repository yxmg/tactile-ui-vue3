<template>
  <div>
    <h1>Switch 组件示例 </h1>
    <Demo :component="normalDemo"></Demo>
    <Demo :component="disabledDemo"></Demo>
  </div>
</template>

<script lang="ts">
import normalDemo from './components/normal-demo.vue'
import disabledDemo from './components/disabled-demo.vue'
import Demo from '../../components/demo.vue'


export default {
  name: "switch-doc",
  components: { Demo },
  setup() {
    return { normalDemo, disabledDemo, Prism }
  }
}
</script>