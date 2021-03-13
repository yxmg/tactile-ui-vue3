<template>
  <div class="t-tab-wrapper">
    <div class="t-tab">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Tab",
  props: {
    title: { type: String },
    content: { type: String },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.t-tab {
  padding: 16px;
}
</style>