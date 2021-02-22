<template>
  <div>Tabs组件</div>
  <component v-for="defaultSlot in defaultSlots" :is="defaultSlot"></component>
</template>

<script lang="ts">
import Tab from './tab.vue'

export default {
  name: "Tabs",
  setup(props, context) {
    // 检查子元素类型
    const defaultSlots = context.slots.default()
    if (defaultSlots.some(slot => slot.type !== Tab)) {
      throw new Error(`Tabs's children must be Tab`)
    }
    return { defaultSlots }
  }
}
</script>

<style scoped>

</style>