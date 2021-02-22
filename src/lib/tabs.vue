<template>
  <div>Tabs组件</div>
  <div v-for="(title, index) in titleProps" :key="index">{{ title }}</div>
  <component v-for="(defaultSlot, index) in defaultSlots" :is="defaultSlot" :key="index"/>
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
    const titleProps = defaultSlots.map(slot => slot.props.title)
    return { defaultSlots, titleProps }
  }
}
</script>

<style scoped>

</style>