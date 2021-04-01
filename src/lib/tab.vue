<template>
  <div class="t-tab-wrapper">
    <div class="t-tab">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  name: "t-tab",
  props: {
    title: { type: String },
    content: { type: String },
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
.t-tab {
  padding: 16px;
}
</style>