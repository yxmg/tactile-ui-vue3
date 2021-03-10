<template>
  <div class="t-tabs" :class="{ 't-tabs-vertical': vertical }">
    <div class="t-tabs-nav" ref="navWrapperRef">
      <div
        tabindex="0"
        class="t-tabs-nav-item"
        :class="{
          selected: keyProps[index] === activeKey,
          disabled: checkBooleanProp(disabledProps[index])
        }"
        v-for="(title, index) in titleProps"
        :ref="(el) => (index === 0 || keyProps[index] === activeKey) && (activeNav = el)"
        :key="index"
        @click="onTabClick(keyProps[index])"
      >
        <svg class="t-tabs-nav-icon icon" v-if="iconProps[index]">
          <use :xlink:href="`#icon-${iconProps[index]}`"></use>
        </svg>
        <component v-if="titleSlots[index]" :is="titleSlots[index]"/>
        <span v-else>{{ title }}</span>
      </div>
      <div class="t-tabs-nav-indicator" ref="indicatorRef"></div>
    </div>
    <div class="t-tabs-content" ref="tabContent" :style="{ height: contentHeight && (contentHeight + 'px') }">
      <template v-if="forceRender">
        <component class="t-tabs-content-item" :is="selectedTab"/>
      </template>
      <template v-else>
        <transition
          v-for="slot in expectDefaultSlots"
          :name="computeTransition"

          @before-enter="onBeforeTransition"
          @after-enter="onAfterTransition"
          @enter-cancelled="onAfterTransition"

          @before-leave="onBeforeTransition"
          @after-leave="onAfterTransition"
          @leave-cancelled="onAfterTransition"

          @enter="onEnter"
        >
          <component
            class="t-tabs-content-item"
            v-show="slot.props.key === activeKey"
            :key="slot.props.key"
            :is="slot"
          />
        </transition>
      </template>
    </div>
  </div>

</template>

<script lang="ts">
import Tab from './tab.vue'
import {ref, computed, onMounted, watch, nextTick, h, reactive} from 'vue'

const mapSlotsProps = (slots, propNames) => {
  return Array.isArray(slots) && slots.reduce((propsMap, slot) => {
    propNames.forEach(propName => {
      const propArr = propsMap[propName]
      propArr ? propArr.push(slot.props[propName]) : (propsMap[propName] = [slot.props[propName]])
    })
    return propsMap
  }, {})
}
const checkBooleanProp = (prop) => {
  return prop !== undefined && prop !== false
}
// 下划线
const useIndicator = (props, { activeNav, navWrapperRef, indicatorRef }) => {
  const updateIndicator = () => {
    // 获取选中Tab的宽度
    const {
      width: activeNavWidth,
      left: activeNavLeft,
      top: activeNavTop,
      height: activeNavHeight
    } = activeNav.value.getBoundingClientRect()
    // 获取容器偏移-Tab偏移
    const {
      left: navWrapperLeft,
      top: navWrapperTop
    } = navWrapperRef.value.getBoundingClientRect()
    if (props.vertical) {
      indicatorRef.value.style.top = activeNavTop - navWrapperTop + 'px'
      indicatorRef.value.style.height = activeNavHeight + 'px'
    } else {
      indicatorRef.value.style.left = activeNavLeft - navWrapperLeft + 'px'
      indicatorRef.value.style.width = activeNavWidth + 'px'
    }

  }
  onMounted(updateIndicator)
  watch(() => props.activeKey, () => {
    nextTick(updateIndicator)
  })
}
// Tab切换动画
const useTabTransition = (props, { keyProps, direction, tabContent, contentHeight }) => {
  let isInTransition = false
  let transitionCount = 0

  // 内容切换动画
  watch(() => props.activeKey, (to, from) => {
    direction.value = keyProps.indexOf(to) > keyProps.indexOf(from) ? 'forward' : 'backward'
  })
  const computeTransition = computed(() =>
    direction.value === 'forward' ? 'slide-forward' : 'slide-backward')

  // 高度自适应动画
  const onEnter = (el) => {
    if (!isInTransition) {
      return
    }

    nextTick(() => {
      if (!computeTransition || !isInTransition) {
        return
      }
      contentHeight.value = el.clientHeight
    })
  }
  const onBeforeTransition = () => {
    if (isInTransition) {
      return
    }
    isInTransition = true
    // 动画加速
    tabContent.value.classList.add('will-change')
    // 离开初态
    if (transitionCount === 0) {
      contentHeight.value = tabContent.value.clientHeight
    }
    // 离开和进入动画同时发生，transitionCount记录
    transitionCount++
  }
  const onAfterTransition = () => {
    if (!isInTransition) {
      return
    }
    isInTransition = false
    transitionCount > 0 && transitionCount--
    if (transitionCount === 0) {  // 动画完全结束
      contentHeight.value = undefined
      tabContent.value.classList.remove('will-change')
    }
  }

  return { computeTransition, onBeforeTransition, onAfterTransition, onEnter }
}


export default {
  name: "Tabs",
  props: {
    activeKey: [String, Number],
    forceRender: {
      type: Boolean,
      default: false
    },
    vertical: {
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
    const {
      title: titleProps,
      key: keyProps,
      disabled: disabledProps,
      icon: iconProps
    } = mapSlotsProps(expectDefaultSlots, ['title', 'key', 'disabled', 'icon'])
    const titleSlots = expectDefaultSlots.map(slot => slot.children.title && slot.children.title()[0])
    const activeNav = ref<HTMLDivElement>(null)
    const navWrapperRef = ref<HTMLDivElement>(null)
    const indicatorRef = ref<HTMLDivElement>(null)
    const tabContent = ref<HTMLDivElement>(null)
    const direction = ref('')
    const contentHeight = ref(null)
    const selectedTab = computed(() =>
      expectDefaultSlots.find(slot => slot.props.key === props.activeKey) || firstTab)
    const onTabClick = (key) => {
      const targetTab = expectDefaultSlots.find(slot => slot.props.key === key)
      if (checkBooleanProp(targetTab.props.disabled)) {
        return
      }
      context.emit('update:activeKey', key)
    }
    useIndicator(props, { activeNav, navWrapperRef, indicatorRef })
    const {
      computeTransition,
      onAfterTransition,
      onBeforeTransition,
      onEnter
    } = useTabTransition(props, { keyProps, direction, tabContent, contentHeight })

    return {
      tabContent,
      contentHeight,
      onAfterTransition,
      onBeforeTransition,
      onEnter,
      titleSlots,
      iconProps,
      disabledProps,
      expectDefaultSlots,
      titleProps,
      keyProps,
      direction,
      selectedTab,
      onTabClick,
      activeNav,
      navWrapperRef,
      indicatorRef,
      computeTransition,
      checkBooleanProp
    }
  }
}
</script>

<style lang="scss" scoped>
$color: #333;
$border-color: #d9d9d9;
$primary-color: #1890ff;

.t-tabs {
  &.t-tabs-vertical {
    display: flex;

    .t-tabs-nav {
      display: flex;
      flex-direction: column;
      flex: 1 0 auto;
      height: auto;
      border-bottom: 0 none;
      border-right: 1px solid $border-color;
      border-left: 1px solid $border-color;
    }

    .t-tabs-nav-item {
      text-align: center;
    }

    .t-tabs-nav-indicator {
      left: auto;
      right: 0;
      width: 3px;
    }

    .t-tabs-content {
      flex: 0 1 100%;
    }
  }

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
      transition: .3s cubic-bezier(.25, .8, .5, 1);
    }

    &-icon {
      margin-right: 8px;
    }

    &-item {
      padding: 8px 16px;
      cursor: pointer;
      will-change: transform;


      &.disabled {
        cursor: not-allowed;
        color: rgba(0, 0, 0, .25);
        user-select: none;

        &:hover,
        &:focus {
          color: rgba(0, 0, 0, .25);
        }

        &:focus:not(:focus-visible) {
          color: rgba(0, 0, 0, .25);
        }

        &:active:not(:focus-visible) {
          color: rgba(0, 0, 0, .25);
        }
      }

      &:hover,
      &:focus {
        color: fade_out($primary-color, 0.3);
        outline: 0;
      }

      &:focus:not(:focus-visible) {
        color: $primary-color;
      }

      &:active:not(:focus-visible) {
        color: #096dd9;
      }

      &.selected {
        color: $primary-color;
      }
    }
  }

  &-content {
    position: relative;
    height: inherit;
    overflow: hidden;
    transition: all .3s cubic-bezier(.25, .8, .5, 1);
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);

    // TODO：performance上观察似乎提升很小，不过稳定在60FPS，后续验证...
    &.will-change {
      will-change: height;

      .t-tabs-content-item {
        will-change: transform;
      }
    }
  }
}
</style>

<style>
/* slide-forward */
.slide-forward-enter-active,
.slide-forward-leave-active {
  transition: .3s cubic-bezier(.25, .8, .5, 1);
}

.slide-forward-enter-from {
  transform: translateX(100%)
}

.slide-forward-leave-to {
  transform: translateX(-100%)
}

/* slide-backward */
.slide-backward-enter-active, .slide-backward-leave-active {
  transition: .3s cubic-bezier(.25, .8, .5, 1);
}

.slide-backward-enter-from {
  transform: translateX(-100%)
}

.slide-backward-leave-to {
  transform: translateX(100%)
}

.slide-forward-leave-form, .slide-forward-leave-to, .slide-backward-leave-from, .slide-backward-leave-to {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
}
</style>