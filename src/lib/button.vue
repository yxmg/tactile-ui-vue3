<template>
  <button
    class="t-button"
    :class="{ [`theme-${theme}`]: theme, }"
  >
    <slot/>
  </button>
</template>

<script lang="ts">
export default {
  name: "Button",
  props: {
    theme: {
      type: String,
      default: 'default'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>