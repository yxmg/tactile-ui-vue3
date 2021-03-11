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
  </div>

</template>

<script lang="ts">
import Tab from './tab.vue'
import {ref, computed, onMounted, watch, nextTick} from 'vue'

const checkBooleanProp = (prop) => {
  return prop !== undefined && prop !== false
}
// Tab-slot处理
const useTabSlot = (context, { isOverflow, navRef, navWrapperRef, nextTick }) => {
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
    isOverflow.value = navRef.value.clientWidth > navWrapperRef.value.clientWidth
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
      .map(slot => slot.children && slot.children.title && slot.children.title()[0])
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
const useTabNavSlide = ({ navWrapperRef, navRef, activeNav }) => {
  const slideTo = (delta, _direction) => {
    const navWrapperScrollLeft = navWrapperRef.value.scrollLeft
    const navWrapperRefScrollWidth = navWrapperRef.value.scrollWidth
    const { width: navWrapperWidth } = navWrapperRef.value.getBoundingClientRect()
    if (_direction === 'forward') {
      delta = navWrapperScrollLeft + navWrapperWidth + delta > navWrapperRefScrollWidth
        ? navWrapperRefScrollWidth - (navWrapperScrollLeft + navWrapperWidth) : delta
    } else {
      delta = navWrapperScrollLeft - delta < 0 ? navWrapperScrollLeft : delta
    }
    // 动画结束后替换为滚动属性
    navRef.value.addEventListener('transitionend', () => {
      navRef.value.style.transition = ''
      navRef.value.style.transform = ''
      navWrapperRef.value.scrollLeft = _direction === 'forward'
        ? navWrapperScrollLeft + delta
        : navWrapperScrollLeft - delta
    })
    // transform移动navRef
    navRef.value.style.transition = '.3s cubic-bezier(.25, .8, .5, 1)'
    navRef.value.style.transform = `translateX(${_direction === 'forward' ? -delta : delta}px)`
  }
  const slidePage = (_direction) => {
    // 获取移动距离 = navWrapper宽度 - 32（2倍padding）
    const { width: navWrapperWidth } = navWrapperRef.value.getBoundingClientRect()
    slideTo(navWrapperWidth, _direction)
  }
  const slideToView = (navItemEl) => {
    const navWrapperScrollLeft = navWrapperRef.value.scrollLeft
    const navWrapperScrollWidth = navWrapperRef.value.scrollWidth
    const { width: navWidth } = navItemEl.getBoundingClientRect()
    const { width: navWrapperWidth } = navWrapperRef.value.getBoundingClientRect()
    const navWrapperCenter = navWrapperWidth / 2
    const centerOffset = navWrapperCenter - navWidth / 2
    const navLeft = navItemEl.offsetLeft
    const activeNavLeft = activeNav.value.offsetLeft

    // 无法居中时移动到边缘
    if (navLeft < centerOffset) {
      slideTo(centerOffset, 'backward')
      return
    } else if (navWrapperScrollWidth - navLeft < centerOffset) {
      slideTo(centerOffset, 'forward')
      return
    }
    const direction = activeNavLeft < navLeft ? 'forward' : 'backward'
    const delta = Math.abs(navLeft - navWrapperScrollLeft - centerOffset)
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
    } = useTabSlot(context, { isOverflow, navRef, navWrapperRef, nextTick })
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
    const { slidePage, slideToView } = useTabNavSlide({ navWrapperRef, navRef, activeNav })
    const onTabClick = (event, key) => {
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
    }

    .t-tabs-nav {
      display: flex;
      flex-direction: column;
      flex: 1 0 auto;
      height: auto;
    }

    .t-tabs-nav-item {
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
  }

  &-next-btn {
    right: 0;
  }

  &-nav {
    display: inline-flex;
    color: $color;
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