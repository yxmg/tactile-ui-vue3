/**
 *Created by 夜雪暮歌 on 2021/2/26
 **/
// @ts-nocheck
import {ref, onMounted, onBeforeUnmount, nextTick} from 'vue'
// 变量声明
const isNull = any => typeof any === undefined || typeof any === null
const isTouch = isNull(window) &&
  ('ontouchstart' in window ||
    (isNull(navigator) && navigator.msMaxTouchPoints > 0) // 兼容IE10
  ) // 是否触控
const CLICK_TYPE = isTouch ? 'touchstart' : 'click'
const CLICK_OUTSIDE = 'clickoutside' // 事件名，注意这里事件名必须全小写
const events = { [CLICK_OUTSIDE]: new Set() }
// document监听冒泡事件判断是否触发@clickoutside
document.addEventListener(CLICK_TYPE, (event) => {
  const { target } = event
  const type = CLICK_OUTSIDE
  const path = event.path || (event.composedPath && event.composedPath()) // 获取事件路径
  // 路径不包含绑定元素或目标不在元素内部说明需要触发
  events[type].forEach(el => {
    // const excludeEls =
    //   el.dataset['outside-exclude'] &&
    //   el.dataset['outside-exclude'].split(',').map(item => document.querySelector(item))
    const excludeEl = el.dataset['outsideExclude'] &&
      document.querySelector(el.dataset['outsideExclude'])  // 注意转驼峰

    const isClickElOutside = (el) => target !== el &&
      (path ? !path.includes(el) : !el.contains(target))

    if (isClickElOutside(el) && isClickElOutside(excludeEl)) {
      dispatchEvent(el, { type })
    }
  })
})

// 事件系统封装，参考红宝书
function observe(el, types) {
  if (typeof types === 'string') {
    types = [types]
  }

  Array.isArray(types) && types.forEach(type => {
    events[type].add(el)
  })
}

function disconnect(el, types) {
  if (typeof types === 'string') {
    types = [types]
  }

  Array.isArray(types) && types.forEach(type => {
    events[type].delete(el)
  })
}

function dispatchEvent(el, payload = {}, Event = window.Event) {
  const { type, bubbles = false, cancelable = false, ...data } = payload
  let event = null
  if (!isNull(Event)) {
    event = new Event(type, { bubbles, cancelable })
  } else {
    // 模拟事件
    event = document.createEvent('HTMLEvents')
    event.initEvent(type, bubbles, cancelable)
  }
  Object.assign(event, data)
  return el.dispatchEvent(event)
}

// hook封装
export function useClickOutside() {
  const wrapper = ref(null)
  onMounted(() => {
    nextTick(() => {
      observe(wrapper.value, CLICK_OUTSIDE)
    })
  })
  onBeforeUnmount(() => {
    disconnect(wrapper.value, CLICK_OUTSIDE)
  })
  return wrapper
}
