<template>
  <div class="t-tabs" :class="{ 't-tabs-vertical': vertical }">
    <div class="t-tabs-slide" :class="{overflow: isOverflow}">
      <div
        class="t-tabs-prev-btn"
        v-if="isOverflow"
        @click="slidePage('backward')"
        @keydown.enter="slidePage('backward')"
        tabindex="0"
      >
        <svg class="t-tabs-nav-icon icon">
          <use :xlink:href="`#icon-left`"></use>
        </svg>
      </div>
      <div class="t-tabs-nav-wrapper" ref="navWrapperRef">
        <div class="t-tabs-nav" ref="navRef">
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
            @keydown.enter="onTabClick($event, keyProps[index])"
            @click="onTabClick($event, keyProps[index])"
          >
            <svg class="t-tabs-nav-icon icon" v-if="iconProps[index]">
              <use :xlink:href="`#icon-${iconProps[index]}`"></use>
            </svg>
            <component v-if="titleSlots[index]" :is="titleSlots[index]"/>
            <span v-else>{{ title }}</span>
          </div>
          <div class="t-tabs-nav-indicator" ref="indicatorRef"></div>
        </div>
      </div>
      <div
        class="t-tabs-next-btn"
        v-if="isOverflow"
        @click="slidePage('forward')"
        @keydown.enter="slidePage('forward')"
        tabindex="0"
      >
        <svg class="t-tabs-nav-icon icon">
          <use :xlink:href="`#icon-right`"></use>
        </svg>
      </div>
    </div>

    <div class="t-tabs-wrapper">
      <div
        class="t-tabs-content"
        ref="tabContent"
        :style="{ height: contentHeight && (contentHeight + 'px') }"
      >
        <template v-if="forceRender">
          <component class="t-tabs-content-item" :is="selectedTab"/>
        </template>
        <template v-else>
          <transition
            v-for="(slot, index) in expectDefaultSlots"
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
              v-show="keyProps.includes(activeKey) ? slot.props.key === activeKey : index === 0"
              :key="slot.props.key"
              :is="slot"
            />
          </transition>
        </template>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import Tab from './tab.vue'
import {ref, computed, onMounted, watch, nextTick, h} from 'vue'

const checkBooleanProp = (prop) => {
  return prop !== undefined && prop !== false
}
// Tab-slot处理
const useTabSlot = (props, { isOverflow, navRef, navWrapperRef, nextTick, context }) => {
  // 筛选slot
  const formatSlots = () => {
    const defaultSlots = context.slots.default()
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
  const expectDefaultSlots = computed(formatSlots)
  const checkSlotsLegality = (slots) => {
    if (!slots.length || slots.some(slot => slot.type.name !== Tab.name)) {
      throw new Error(`Tabs's children must be Tab`)
    }
  }
  checkSlotsLegality(expectDefaultSlots.value)

  // 判断slot是否超出容器
  const checkOverflow = () => {
    const compareProp = props.vertical ? 'clientHeight' : 'clientWidth'
    isOverflow.value = navRef.value[compareProp] > navWrapperRef.value[compareProp]
  }
  onMounted(checkOverflow)
  watch(() => context.slots.default(), () => nextTick(checkOverflow))

  // 提取属性
  const titleProps = ref(null)
  const keyProps = ref(null)
  const disabledProps = ref(null)
  const iconProps = ref(null)
  const titleSlots = ref(null)
  const extractData = () => {
    titleProps.value = expectDefaultSlots.value.map(item => item.props.title)
    keyProps.value = expectDefaultSlots.value.map(item => item.props.key)
    disabledProps.value = expectDefaultSlots.value.map(item => item.props.disabled)
    iconProps.value = expectDefaultSlots.value.map(item => item.props.icon)
    titleSlots.value = expectDefaultSlots.value
      .map(slot => slot.children && slot.children.title && h('div', { class: 't-tabs-nav-title' }, slot.children.title()))
  }
  extractData()
  watch(() => context.slots.default(), extractData)

  return { expectDefaultSlots, titleProps, keyProps, disabledProps, iconProps, titleSlots }
}
// 下划线
const useIndicator = (props, { activeNav, navRef, indicatorRef }) => {
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
    } = navRef.value.getBoundingClientRect()
    if (props.vertical) {
      if (indicatorRef.value.style.left) {
        indicatorRef.value.style.left = ''
        indicatorRef.value.style.width = ''
      }
      indicatorRef.value.style.top = activeNavTop - navWrapperTop + 'px'
      indicatorRef.value.style.height = activeNavHeight + 'px'
    } else {
      if (indicatorRef.value.style.top) {
        indicatorRef.value.style.top = ''
        indicatorRef.value.style.height = ''
      }
      indicatorRef.value.style.left = activeNavLeft - navWrapperLeft + 'px'
      indicatorRef.value.style.width = activeNavWidth + 'px'
    }

  }
  onMounted(updateIndicator)
  watch(() => props.activeKey, () => {
    nextTick(updateIndicator)
  })
  watch(() => props.vertical, () => {
    nextTick(updateIndicator)
  })
}
// Tab切换动画
const useTabTransition = (props, { keyProps, direction, tabContent, contentHeight }) => {
  let isInTransition = false
  let transitionCount = 0

  // 内容切换动画
  watch(() => props.activeKey, (to, from) => {
    direction.value = keyProps.value.indexOf(to) > keyProps.value.indexOf(from) ? 'forward' : 'backward'
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
// Tab-nav-slide切换
const useTabNavSlide = (props, { navWrapperRef, navRef, activeNav }) => {
  const VERTICAL_MAP = {
    SCROLL_DISTANCE: 'scrollTop',
    SCROLL_DIMENSION: 'scrollHeight',
    DIMENSION: 'height',
    TRANSFORM: 'translateY',
    OFFSET_DISTANCE: 'offsetTop'
  }
  const HORIZONTAL_MAP = {
    SCROLL_DISTANCE: 'scrollLeft',
    SCROLL_DIMENSION: 'scrollWidth',
    DIMENSION: 'width',
    TRANSFORM: 'translateX',
    OFFSET_DISTANCE: 'offsetLeft'
  }
  const slideTo = (delta, _direction) => {
    const MAP = props.vertical ? VERTICAL_MAP : HORIZONTAL_MAP
    const navWrapperScrollDistance = navWrapperRef.value[MAP.SCROLL_DISTANCE]
    const navWrapperScrollDimension = navWrapperRef.value[MAP.SCROLL_DIMENSION]
    const { [MAP.DIMENSION]: navWrapperDimension } = navWrapperRef.value.getBoundingClientRect()
    if (_direction === 'forward') {
      delta = navWrapperScrollDistance + navWrapperDimension + delta > navWrapperScrollDimension
        ? navWrapperScrollDimension - (navWrapperScrollDistance + navWrapperDimension) : delta
    } else {
      delta = navWrapperScrollDistance - delta < 0 ? navWrapperScrollDistance : delta
    }
    // 动画结束后替换为滚动属性
    navRef.value.addEventListener('transitionend', () => {
      navRef.value.style.transition = ''
      navRef.value.style.transform = ''
      navWrapperRef.value[MAP.SCROLL_DISTANCE] = _direction === 'forward'
        ? navWrapperScrollDistance + delta
        : navWrapperScrollDistance - delta
    })
    // transform移动navRef
    navRef.value.style.transition = '.3s cubic-bezier(.25, .8, .5, 1)'
    navRef.value.style.transform = `${MAP.TRANSFORM}(${_direction === 'forward' ? -delta : delta}px)`
  }
  const slidePage = (_direction) => {
    const MAP = props.vertical ? VERTICAL_MAP : HORIZONTAL_MAP
    // 获取移动距离 = navWrapper宽度
    const { [MAP.DIMENSION]: navWrapperDimension } = navWrapperRef.value.getBoundingClientRect()
    slideTo(navWrapperDimension, _direction)
  }
  const slideToView = (navItemEl) => {
    const MAP = props.vertical ? VERTICAL_MAP : HORIZONTAL_MAP
    const navWrapperScrollDistance = navWrapperRef.value[MAP.SCROLL_DISTANCE]
    const navWrapperScrollDimension = navWrapperRef.value[MAP.SCROLL_DIMENSION]
    const { [MAP.DIMENSION]: navDimension } = navItemEl.getBoundingClientRect()
    const { [MAP.DIMENSION]: navWrapperDimension } = navWrapperRef.value.getBoundingClientRect()
    const navWrapperCenter = navWrapperDimension / 2
    const centerOffset = navWrapperCenter - navDimension / 2
    const navDistance = navItemEl[MAP.OFFSET_DISTANCE]
    const activeNavDistance = activeNav.value[MAP.OFFSET_DISTANCE]

    // 无法居中时移动到边缘
    if (navDistance < centerOffset) {
      slideTo(centerOffset, 'backward')
      return
    } else if (navWrapperScrollDimension - navDistance < centerOffset) {
      slideTo(centerOffset, 'forward')
      return
    }
    const direction = activeNavDistance < navDistance ? 'forward' : 'backward'
    const delta = Math.abs(navDistance - navWrapperScrollDistance - centerOffset)
    slideTo(delta, direction)
  }
  return { slidePage, slideToView }
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
    const isOverflow = ref(false)
    const navWrapperRef = ref<HTMLDivElement>(null)
    const navRef = ref<HTMLDivElement>(null)
    const {
      expectDefaultSlots,
      titleProps,
      keyProps,
      disabledProps,
      iconProps,
      titleSlots
    } = useTabSlot(props, { isOverflow, navRef, navWrapperRef, nextTick, context })
    const firstTab = expectDefaultSlots.value[0]
    const activeNav = ref<HTMLDivElement>(null)
    const indicatorRef = ref<HTMLDivElement>(null)
    const tabContent = ref<HTMLDivElement>(null)
    const direction = ref('')
    const contentHeight = ref(null)
    const selectedTab = computed(() =>
      expectDefaultSlots.value.find(slot => slot.props.key === props.activeKey) || firstTab)
    useIndicator(props, { activeNav, navRef, indicatorRef })
    const {
      computeTransition,
      onAfterTransition,
      onBeforeTransition,
      onEnter
    } = useTabTransition(props, { keyProps, direction, tabContent, contentHeight })
    const { slidePage, slideToView } = useTabNavSlide(props, { navWrapperRef, navRef, activeNav })
    const onTabClick = (event, key) => {
      if (key === props.activeKey) {
        return
      }
      const targetTab = expectDefaultSlots.value.find(slot => slot.props.key === key)
      if (checkBooleanProp(targetTab.props.disabled)) {
        return
      }
      context.emit('update:activeKey', key)
      slideToView(event.currentTarget)
    }

    return {
      isOverflow,
      slidePage,
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
      navRef,
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
  position: relative;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);

  &-wrapper {
    flex: auto;
  }

  &.t-tabs-vertical {
    display: flex;

    .t-tabs-slide {
      border-bottom: 0 none;
      border-right: 1px solid $border-color;
      border-left: 1px solid $border-color;

      &.overflow {
        padding: 50px 0;
      }
    }

    .t-tabs-prev-btn, .t-tabs-next-btn {
      width: 100%;
      height: 50px;

      .t-tabs-nav-icon {
        transform: rotate(90deg);
      }
    }

    .t-tabs-prev-btn {
      top: 0;
      bottom: auto;
    }

    .t-tabs-next-btn {
      bottom: 0;
      top: auto;
    }

    .t-tabs-nav {
      display: flex;
      flex-direction: column;
      flex: 1 0 auto;
      height: auto;
    }

    .t-tabs-nav-item {
      padding: 16px;
      text-align: center;
    }

    .t-tabs-nav-indicator {
      left: auto;
      right: 0;
      width: 3px;
    }

  }

  &-nav-wrapper {
    position: relative;
    max-width: 100%;
    max-height: 500px;
    overflow: auto;
    // 隐藏滚动条
    -ms-overflow-style: none; // IE
    scrollbar-width: none; // Firefox

    &::-webkit-scrollbar {
      display: none; // Chrome、Safari
    }
  }

  &-slide {
    position: relative;
    background-color: #fff;
    border-bottom: 1px solid $border-color;
    transition: padding .3s cubic-bezier(.25, .8, .5, 1);

    &.overflow {
      padding: 0 50px;
    }
  }

  &-prev-btn, &-next-btn {
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: inherit;
    z-index: 1;
    cursor: pointer;

    &:hover, &:focus {
      color: fade_out($primary-color, 0.3);
      outline: 0;
    }

    &:focus:not(:focus-visible) {
      color: inherit;
    }

    &:active:not(:focus-visible) {
      color: #096dd9;
    }
  }

  &-prev-btn {
    left: 0;
    right: auto;
  }

  &-next-btn {
    right: 0;
    left: auto;
  }

  &-nav {
    display: inline-flex;
    color: $color;
    position: relative;

    &-indicator {
      position: absolute;
      left: 0;
      bottom: 0;
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
      flex-shrink: 0;
      white-space: nowrap;


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