<template>
  <div class="t-tabs">
    <div class="t-tabs-nav">
      <div
        class="t-tabs-nav-item"
        :class="{ selected: keyProps[index] === activeKey}"
        v-for="(title, index) in titleProps"
        :key="index"
        @click="onTabClick(keyProps[index])"
      >
        <span>{{ title }}</span>
        <div v-if="index === 0" class="t-tabs-nav-indicator"></div>
      </div>
    </div>
    <div class="t-tabs-content">
      <component
        class="t-tabs-content-item"
        :is="selectedTab"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Tab from './tab.vue'
import {computed} from 'vue'

export default {
  name: "Tabs",
  props: {
    activeKey: [String, Number]
  },
  setup(props, context) {
    // 检查子元素类型
    const defaultSlots = context.slots.default()
    if (defaultSlots.some(slot => slot.type !== Tab)) {
      throw new Error(`Tabs's children must be Tab`)
    }
    const titleProps = defaultSlots.map(slot => slot.props.title)
    const keyProps = defaultSlots.map(slot => slot.props.key)
    const selectedTab = computed(() => defaultSlots.find(slot => slot.props.key === props.activeKey))
    const onTabClick = (key) => {
      context.emit('update:activeKey', key)
    }
    return { defaultSlots, titleProps, keyProps, selectedTab, onTabClick }
  }
}
</script>

<style lang="scss" scoped>
$color: #333;
$border-color: #d9d9d9;
$primary-color: #1890ff;

.t-tabs {
  &-nav {
    display: flex;
    color: $color;
    border-bottom: 1px solid $border-color;

    &-indicator {
      position: absolute;
      left: 0;
      bottom: -1px;
      width: 100%;
      height: 3px;
      background-color: $primary-color;
    }

    &-item {
      position: relative;
      padding: 8px 0;
      margin: 0 16px;
      cursor: pointer;

      &:first-child {
        margin-left: 0;
      }

      &.selected {
        color: $primary-color;
      }
    }
  }

  &-content {
    padding: 8px 0;
  }
}
</style>