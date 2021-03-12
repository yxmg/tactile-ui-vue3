<template>
  <div class="modal-trigger" @click="open" v-if="triggerSlot">
    <slot name="trigger"></slot>
  </div>
  <Teleport :to="mountedNode">
    <transition name="fade" appear>
      <div
        class="t-dialog-mask"
        v-if="!hideMask && !fullscreen && currentVisible"
        @click="onClickMask"
      />
    </transition>
    <div
      class="t-dialog-wrapper"
      ref="dialogWrapperRef"
      :style="{ width: fullscreen ?  '100%' : dialogWidth }"
      :class="[dialogClass, { 't-dialog-fullscreen' : fullscreen, 't-dialog-draggable': draggable }]"
    >
      <transition :name="transition" appear>
        <div class="t-dialog" v-show="currentVisible">
          <div class="t-dialog-header" v-if="!hideHeader" ref="dialogHeaderRef">
            <slot name="title">
              <span class="t-dialog-title">{{ title }}</span>
            </slot>
            <span v-if="!hideClose && otherClosable" class="t-dialog-close" @click="close"></span>
          </div>
          <div class="t-dialog-content">
            <slot/>
          </div>
          <div class="t-dialog-footer" v-if="!hideFooter">
            <slot name="footer">
              <Button @click="cancel">{{ cancelText }}</Button>
              <Button theme="primary" @click="ok" :loading="okLoading">{{ okText }}</Button>
            </slot>
          </div>
        </div>
      </transition>
    </div>
  </Teleport>
</template>

<script lang="ts">
import Button from './button.vue'
import {computed, watch, onBeforeUnmount, onMounted, ref} from 'vue'

const useKeyboard = (props, { close }) => {
  const escEvent = (event) => {
    const key = event.key || event.keyCode
    if (key === 'Escape' || key === 27) {
      props.escClosable && close(true)
    }
  }
  const addEscEvent = () => {
    document.addEventListener('keydown', escEvent)
  }
  const removeEscEvent = () => {
    document.removeEventListener('keydown', escEvent)
  }
  onMounted(addEscEvent)
  onBeforeUnmount(removeEscEvent)
}
// TODO：代码有点丑，后续优化
const useDrag = (props, { dialogWrapperRef, dialogHeaderRef, onMounted, watch }) => {
  const handleDrag = () => {
    // 注册mousedown，获取拖拽初态
    const mousedown = (event) => {
      event = event.touches ? event.touches[0] : event
      const distanceX = event.clientX - dialogHeaderRef.value.offsetLeft
      const distanceY = event.clientY - dialogHeaderRef.value.offsetTop
      const { left: currentX, top: currentY } = getComputedStyle(dialogWrapperRef.value)
      // 禁止选中，避免触发原生选中
      dialogWrapperRef.value.style.userSelect = 'none'
      // 计算位移边界
      const screenWidth = document.documentElement.clientWidth
      const screenHeight = document.documentElement.clientHeight
      const dialogWrapperWidth = dialogWrapperRef.value.clientWidth
      const dialogWrapperHeight = dialogWrapperRef.value.clientHeight
      const {
        top: dialogWrapperViewTop,
        left: dialogWrapperViewLeft
      } = dialogWrapperRef.value.getBoundingClientRect()
      // 修正transform影响
      const transformX = parseInt(dialogWrapperViewLeft) - parseInt(currentX)
      const transformY = parseInt(dialogWrapperViewTop) - parseInt(currentY)

      const maxDialogTop = screenHeight - dialogWrapperHeight / 2 - transformY
      const minDialogTop = -transformY
      const maxDialogLeft = screenWidth - dialogWrapperWidth / 2 - transformX
      const minDialogLeft = -(dialogWrapperWidth / 2) - transformX

      const mousemove = (event) => {
        event.preventDefault()
        event = event.touches ? event.touches[0] : event
        // 注册mousemove，实时计算位移终态
        const deltaX = event.clientX - distanceX
        const deltaY = event.clientY - distanceY

        // 限制位移，避免用户拽出屏幕无法拽回
        let targetX = deltaX + parseInt(currentX)
        let targetY = deltaY + parseInt(currentY)
        targetX = Math.max(minDialogLeft, targetX)
        targetX = Math.min(maxDialogLeft, targetX)
        targetY = Math.max(minDialogTop, targetY)
        targetY = Math.min(maxDialogTop, targetY)
        dialogWrapperRef.value.style.cssText
          += `;left: ${targetX}px; top: ${targetY}px`
      }
      // 注册mouseup，注销mousemove、mouseup并取消禁止选中
      const mouseup = () => {
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
        // 移动端
        document.removeEventListener('touchmove', mousemove)
        document.removeEventListener('touchend', mouseup)
        document.removeEventListener('touchcancel', mouseup)
        dialogWrapperRef.value.style.userSelect = ''
      }
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
      // 移动端
      document.addEventListener('touchmove', mousemove, { passive: false })
      document.addEventListener('touchend', mouseup)
      document.addEventListener('touchcancel', mouseup)
    }
    dialogHeaderRef.value.onmousedown = props.draggable ? mousedown : null
    // 移动端
    dialogHeaderRef.value.ontouchstart = props.draggable ? mousedown : null
  }
  onMounted(handleDrag)
  watch(() => props.draggable, handleDrag)
}

export default {
  name: "Dialog",
  props: {
    content: String,
    width: { type: [Number, String], default: 500 },
    visible: { type: Boolean, default: false },
    title: { type: String, default: '' },
    okText: { type: String, default: '确认' },
    cancelText: { type: String, default: '取消' },
    dialogClass: String,
    hideMask: { type: Boolean, default: false },
    hideHeader: { type: Boolean, default: false },
    hideFooter: { type: Boolean, default: false },
    hideClose: { type: Boolean, default: false },
    mountedNode: { type: String, default: 'body' },
    fullscreen: { type: Boolean, default: false },
    maskClosable: { type: Boolean, default: true },
    escClosable: { type: Boolean, default: true },
    otherClosable: { type: Boolean, default: true },
    draggable: { type: Boolean, default: false },
    transition: { type: String, default: 'dialog-transition' },
    ok: {
      type: Function,
      default: () => {
      }
    },
    cancel: {
      type: Function,
      default: () => {
      }
    }
  },
  emits: ['update:visible', 'visibleChange'],
  components: { Button },
  setup(props, context) {
    const currentVisible = ref(props.visible)
    watch(() => props.visible, (visible) => {
      currentVisible.value = visible
      context.emit('visibleChange', visible)
    })
    watch(() => currentVisible.value, (visible) => {
      if (props.fullscreen) {
        document.documentElement.style.overflow = visible ? 'hidden' : ''
      }
    })
    const dialogWrapperRef = ref<HTMLDivElement>(null)
    const dialogHeaderRef = ref<HTMLDivElement>(null)
    const close = (otherClose = false) => {
      if (!props.otherClosable && otherClose) {
        return
      }
      context.emit('update:visible', false)
      currentVisible.value = false
    }
    const onClickMask = () => {
      props.maskClosable && close(true)
    }
    const okLoading = ref(false)
    const ok = () => {
      okLoading.value = true
      Promise.resolve(props.ok())
        .then((result) => {
          console.log(3, "3")
          if (result !== false) {
            close()
          }
        })
        .finally(() => {
          okLoading.value = false
        })
    }
    const cancel = () => {
      if (props.cancel() !== false) {
        close()
      }
    }
    const dialogWidth = computed(() => {
      return typeof props.width === 'string' ? props.width : props.width + 'px'
    })
    const open = () => {
      context.emit('update:visible', true)
      currentVisible.value = true
    }
    const triggerSlot = context.slots.trigger && context.slots.trigger()
    useKeyboard(props, { close })
    useDrag(props, { dialogWrapperRef, dialogHeaderRef, onMounted, watch })
    return {
      currentVisible,
      close,
      onClickMask,
      ok,
      cancel,
      dialogWidth,
      open,
      dialogWrapperRef,
      dialogHeaderRef,
      triggerSlot,
      okLoading
    }
  }
}
</script>

<style lang="scss" scoped>
$radius: 4px;
$border-color: #d9d9d9;
.t-dialog {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: $radius;
  box-shadow: 0 0 3px fade_out(black, 0.5);
  width: 100%;
  height: 100%;
  min-width: 15em;
  transition: .3s cubic-bezier(.25, .8, .25, 1);
  pointer-events: auto;

  &-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: fade_out(black, 0.5);
    z-index: 10;
    transition: opacity .3s cubic-bezier(.25, .8, .25, 1);
    will-change: opacity;
  }

  &-wrapper {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: 100%;

    &.t-dialog-fullscreen .t-dialog {
      height: 100vh;
      overflow-x: hidden;
      overflow-y: auto;
    }

    &.t-dialog-draggable {
      .t-dialog-header {
        cursor: move;
      }
    }

    &:not(.t-dialog-fullscreen) {
      max-width: 90%;

      .t-dialog-content {
        max-height: 80vh;
      }
    }
  }

  &-header {
    padding: 12px 16px;
    border-bottom: 1px solid $border-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
  }

  &-content {
    padding: 12px 16px;
    flex: auto;
    overflow: auto;
  }

  &-footer {
    border-top: 1px solid $border-color;
    padding: 12px 16px;
    text-align: right;

    .t-button ~ .t-button {
      margin-left: 10px;
    }
  }

  &-close {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    cursor: pointer;

    &::before,
    &::after {
      content: '';
      position: absolute;
      height: 1px;
      background: black;
      width: 100%;
      top: 50%;
      left: 50%;
    }

    &::before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    &::after {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
}

.modal-trigger {
  display: inline-block;
}
</style>
<style>
.fade-enter-active, .fade-enter-active {
  transition: .3s cubic-bezier(.25, .8, .5, 1);
}

.fade-enter-from, .fade-leave-to {
  opacity: 0
}

.dialog-transition-enter-from, .dialog-transition-leave-to {
  transform: scale(.5);
  opacity: 0
}

.dialog-transition-enter-to, .dialog-transition-leave {
  opacity: 1
}

.slide-top-enter-from, .slide-top-leave-to {
  transform: translateY(100%);
  opacity: 0
}

.slide-bottom-enter-from, .slide-bottom-leave-to {
  transform: translateY(-100%);
  opacity: 0
}

.slide-top-enter-to, .slide-top-leave,
.slide-bottom-enter-to, .slide-bottom-leave {
  opacity: 1
}

.slide-left-enter-from, .slide-left-leave-to {
  transform: translateX(100%);
  opacity: 0
}

.slide-right-enter-from, .slide-right-leave-to {
  transform: translateX(-100%);
  opacity: 0
}

.slide-left-enter-to, .slide-left-leave,
.slide-right-enter-to, .slide-right-leave {
  opacity: 1
}

</style>