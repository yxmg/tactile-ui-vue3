<template>
  <div class="t-tabs">
    <div class="t-tabs-nav">
      <div class="t-tabs-nav-item" v-for="(title, index) in titleProps" :key="index">{{ title }}</div>
    </div>
    <div class="t-tabs-content">
      <component
        class="t-tabs-content-item"
        v-for="(defaultSlot, index) in defaultSlots"
        :is="defaultSlot"
        :key="index"
      />
    </div>
  </div>
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

<style lang="scss" scoped>
$blue: #40a9ff;
$color: #333;
$border-color: #d9d9d9;
.t-tabs {
  &-nav {
    display: flex;
    color: $color;
    border-bottom: 1px solid $border-color;

    &-item {
      padding: 8px 0;
      margin: 0 16px;
      cursor: pointer;

      &:first-child {
        margin-left: 0;
      }

      &.selected {
        color: $blue;
      }
    }
  }

  &-content {
    padding: 8px 0;
  }
}
</style>