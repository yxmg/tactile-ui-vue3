<template>
  <div class="tabs-doc">
    <h1>Tabs 标签页 </h1>
    <Demo :component="normalDemo"></Demo>
    <Demo :component="iconDemo"></Demo>
    <Demo :component="customTitleDemo"></Demo>
    <Demo :component="disabledDemo"></Demo>
    <Demo :component="verticalDemo"></Demo>
    <Demo :component="overflowDemo"></Demo>
    <Demo :component="keyboardDemo"></Demo>
    <Demo :component="fullDemo"></Demo>
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
import keyboardDemo from './components/keyboard-demo.vue'
import fullDemo from './components/full-demo.vue'

export default {
  name: "tabs-doc",
  components: { Demo },
  setup() {
    return { normalDemo, disabledDemo, iconDemo, customTitleDemo, verticalDemo, overflowDemo, fullDemo, keyboardDemo }
  }
}
</script>