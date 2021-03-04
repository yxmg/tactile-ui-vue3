<template>
  <div class="t-tabs">
    <div class="t-tabs-nav" ref="navWrapperRef">
      <div
        class="t-tabs-nav-item"
        :class="{ selected: keyProps[index] === activeKey}"
        v-for="(title, index) in titleProps"
        :ref="(el) => (index === 0 || keyProps[index] === activeKey) && (activeNav = el)"
        :key="index"
        @click="onTabClick(keyProps[index])"
      >
        <span>{{ title }}</span>
      </div>
      <div class="t-tabs-nav-indicator" ref="indicatorRef"></div>
    </div>
    <div class="t-tabs-content">
      <template v-if="forceRender">
        <component
          class="t-tabs-content-item"
          :is="selectedTab"
        />
      </template>
      <template v-else>
        <component
          class="t-tabs-content-item"
          v-for="slot in expectDefaultSlots"
          v-show="slot.props.key === activeKey"
          :is="slot"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Tab from './tab.vue'
import {ref, computed, onMounted, watch, nextTick, h, reactive} from 'vue'

export default {
  name: "Tabs",
  props: {
    activeKey: [String, Number],
    forceRender: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const formatSlots = () => {
      const defaultSlots = context.slots.default()
      // 处理slots
      const tempArr = []
      defaultSlots.forEach(slot => {
        const isVForNode = Array.isArray(slot.children)
        const isCommentNode = typeof slot.type === 'symbol'
        if (isVForNode) {
          // 展开v-for节点
          tempArr.push(...slot.children)
        } else if (!isCommentNode) {
          // 过滤注释节点
          tempArr.push(slot)
        }
      })
      return tempArr
    }
    const expectDefaultSlots = formatSlots()
    const checkSlotsLegality = (slots) => {
      if (!slots.length || slots.some(slot => slot.type.name !== Tab.name)) {
        throw new Error(`Tabs's children must be Tab`)
      }
    }
    checkSlotsLegality(expectDefaultSlots)

    const firstTab = expectDefaultSlots[0]
    const titleProps = expectDefaultSlots.map(slot => slot.props.title)
    const keyProps = expectDefaultSlots.map(slot => slot.props.key)
    const activeNav = ref<HTMLDivElement>(null)
    const navWrapperRef = ref<HTMLDivElement>(null)
    const indicatorRef = ref<HTMLDivElement>(null)
    // forceRender
    const selectedTab = computed(() =>
      expectDefaultSlots.find(slot => slot.props.key === props.activeKey) || firstTab)
    const onTabClick = (key) => {
      context.emit('update:activeKey', key)
    }

    const useIndicator = () => {
      const updateIndicator = () => {
        // 获取选中Tab的宽度
        const { width: activeNavWidth, left: activeNavLeft } = activeNav.value.getBoundingClientRect()
        // 获取容器偏移-Tab偏移
        const { left: navWrapperLeft } = navWrapperRef.value.getBoundingClientRect()
        indicatorRef.value.style.left = activeNavLeft - navWrapperLeft + 'px'
        indicatorRef.value.style.width = activeNavWidth + 'px'
      }
      onMounted(updateIndicator)
      watch(() => props.activeKey, () => {
        nextTick(updateIndicator)
      })
    }
    useIndicator()


    return {
      expectDefaultSlots,
      titleProps,
      keyProps,
      selectedTab,
      onTabClick,
      activeNav,
      navWrapperRef,
      indicatorRef
    }
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
    position: relative;

    &-indicator {
      position: absolute;
      left: 0;
      bottom: -1px;
      height: 3px;
      background-color: $primary-color;
      transition: width 0.25s, left 0.25s;
    }

    &-item {
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
    padding: 16px 0;
  }
}
</style>