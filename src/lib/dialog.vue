<template>
  <div class="modal-trigger" @click="showDialog">
    <slot name="trigger"></slot>
  </div>
  <template v-if="visible">
    <Teleport :to="mountedNode">
      <div class="t-dialog-mask" v-if="!hideMask || fullscreen" @click="onClickMask"></div>
      <div
        class="t-dialog-wrapper"
        :style="{ width: fullscreen ?  '100%' : dialogWidth }"
        :class="[dialogClass, { 't-dialog-fullscreen' : fullscreen }]"
      >
        <div class="t-dialog">
          <div class="t-dialog-header" v-if="!hideHeader">
            <slot name="title">
              <span class="t-dialog-title">{{ title }}</span>
            </slot>
            <span class="t-dialog-close" @click="close" v-if="!hideClose"></span>
          </div>
          <div class="t-dialog-content">
            <slot/>
          </div>
          <div class="t-dialog-footer" v-if="!hideFooter">
            <slot name="footer">
              <Button theme="primary" @click="ok">确认</Button>
              <Button @click="cancel">取消</Button>
            </slot>
          </div>
        </div>
      </div>
    </Teleport>
  </template>
</template>

<script lang="ts">
import Button from './button.vue'
import {computed} from 'vue'

export default {
  name: "Dialog",
  props: {
    width: { type: [Number, String], default: 500 },
    visible: { type: Boolean, default: false },
    dialogClass: String,
    hideMask: { type: Boolean, default: false },
    hideHeader: { type: Boolean, default: false },
    hideFooter: { type: Boolean, default: false },
    hideClose: { type: Boolean, default: false },
    maskClosable: { type: Boolean, default: false },
    mountedNode: { type: String, default: 'body' },
    title: { type: String, default: '' },
    fullscreen: { type: Boolean, default: false },
    ok: {
      type: Function, default: () => {
      }
    },
    cancel: {
      type: Function, default: () => {
      }
    }
  },
  components: { Button },
  setup(props, context) {
    const close = () => {
      context.emit('update:visible', false)
    }
    const onClickMask = () => {
      props.maskClosable && close()
    }
    const ok = () => {
      if (props.ok() !== false) {
        close()
      }
    }
    const cancel = () => {
      if (props.cancel() !== false) {
        close()
      }
    }
    const dialogWidth = computed(() => {
      return typeof props.width === 'string' ? props.width : props.width + 'px'
    })
    const showDialog = () => {
      context.emit('update:visible', true)
    }
    return { close, onClickMask, ok, cancel, dialogWidth, showDialog }
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

  &-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: fade_out(black, 0.5);
    z-index: 10;
  }

  &-wrapper {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: 100%;

    &.t-dialog-fullscreen {
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }

    &:not(.t-dialog-fullscreen) {
      max-width: 90%;
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
</style>