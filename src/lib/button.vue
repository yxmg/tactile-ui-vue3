<template>
  <button
    class="t-button"
    :class="classes"
    :disabled="disabled || loading"
  >
    <span class="loading-indicator"></span>
    <svg class="icon" v-if="icon">
      <use :xlink:href="`#icon-${icon}`"></use>
    </svg>
    <span class="content" v-if="$slots.default"><slot/></span>
  </button>
</template>

<script lang="ts">
import {computed} from 'vue'

export default {
  name: "Button",
  props: {
    // 主题，可选值：default、primary、danger、success
    theme: {
      type: String,
      default: 'default'
    },
    // 尺寸，可选值：large、normal、small
    size: {
      type: String,
      default: 'normal'
    },
    // 形状，可选：rect、round、circle
    shape: {
      type: String,
      default: 'round'
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否loading
    loading: {
      type: Boolean,
      default: false
    },
    // 块状按钮，占满容器
    block: {
      type: Boolean,
      default: false
    },
    // 是否链接按钮
    text: {
      type: Boolean,
      default: false
    },
    // 图标配置
    icon: String
  },
  setup(props) {
    const classes = computed(() => {
      return {
        [`t-theme-${props.theme}`]: props.theme,
        [`t-size-${props.size}`]: props.size,
        [`t-shape-${props.shape}`]: props.shape,
        't-text-button': props.text,
        't-loading-button': props.loading,
        't-block-button': props.block,
        't-disabled-button': props.disabled,
      }
    })
    return { classes }
  }
}
</script>

<style lang="scss">
$primary-color: #1890ff;
$success-color: #52c41a;
$danger-color: #f5222d;
$smallButtonHeight: 28px;
$normalButtonHeight: 36px;
$largeButtonHeight: 44px;

.t-button {
  display: inline-block;
  position: relative;
  line-height: 1.5;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  box-shadow: 0 2px 0 rgba(0, 0, 0, .015);
  cursor: pointer;
  transition: padding .3s cubic-bezier(.645, .045, .355, 1);
  // 用户选择文本
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  // 只允许滚动和缩放
  touch-action: manipulation;
  height: $normalButtonHeight;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  color: rgba(0, 0, 0, .65);
  background-color: #fff;
  border: 1px solid #d9d9d9;

  &,
  &:active,
  &:focus {
    outline: none;
  }

  &:focus {
    box-shadow: 0 0 0 2px fade_out($primary-color, 0.5)
  }

  &:focus:not(:focus-visible) {
    box-shadow: none;
  }

  &::after {
    background-color: currentColor;
    border-radius: inherit;
    color: inherit;
    content: "";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    transition: opacity .2s cubic-bezier(.4, 0, .6, 1);
  }

  &:active::after {
    background-color: #000000;
    opacity: 0.08;
  }

  &:hover::after {
    opacity: 0.08;
  }

  &.t-theme-default {
    background-color: #fff;


    &.t-loading-button .loading-indicator {
      border-right-color: $primary-color;
    }
  }

  &.t-theme-primary {
    color: #ffffff;
    background-color: $primary-color;
    border-color: $primary-color;
  }

  &.t-theme-danger {
    color: #ffffff;
    background-color: $danger-color;
    border-color: $danger-color;

    &:focus {
      box-shadow: 0 0 0 2px fade_out($danger-color, 0.5)
    }

    &:focus:not(:focus-visible) {
      box-shadow: none;
    }
  }

  &.t-theme-success {
    color: #ffffff;
    background-color: $success-color;
    border-color: $success-color;

    &:focus {
      box-shadow: 0 0 0 2px fade_out($success-color, 0.5)
    }

    &:focus:not(:focus-visible) {
      box-shadow: none;
    }
  }

  &.t-size-large {
    height: $largeButtonHeight;
    padding: 0 20px;
    font-size: 18px;

    &.t-shape-circle {
      min-width: $largeButtonHeight;
    }
  }

  &.t-size-small {
    padding: 0 12px;
    font-size: 14px;
    height: $smallButtonHeight;

    &.t-shape-circle {
      min-width: $smallButtonHeight;
    }
  }

  &.t-disabled-button {
    background-color: #f5f5f5;
    color: rgba(0, 0, 0, .25);
    border-color: #d9d9d9;
    cursor: not-allowed;

    &.t-text-button {
      color: rgba(0, 0, 0, .25);
    }

    &::after {
      display: none;
    }
  }

  &.t-shape-rect {
    border-radius: 0;
  }

  &.t-shape-round {
    border-radius: 4px
  }

  &.t-shape-circle {
    min-width: $normalButtonHeight;
    padding: 0;
    border-radius: 50%;
  }

  &.t-text-button {
    color: #1890ff;
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;

    &::after {
      display: none;
    }

    &:hover {
      opacity: .8;
    }

    &:active,
    &:focus,
    &:hover {
      border-color: transparent;
    }
  }

  &.t-block-button {
    width: 100%;
  }

  &.t-loading-button {
    cursor: not-allowed;

    &:not(.t-shape-circle) {
      padding-left: 30px;

      .loading-indicator {
        margin-left: -14px;
      }
    }

    &:hover::after {
      opacity: 0;
    }

    &:before {
      content: '';
      display: block;
      position: absolute;
      left: -1px;
      top: -1px;
      right: -1px;
      bottom: -1px;
      z-index: 1;
      background-color: #fff;
      opacity: 0.35;
      transition: opacity 0.2s;
      border-radius: inherit;
    }

    &.t-text-button {
      .loading-indicator {
        border-left-color: #1890ff;
      }
    }

    .loading-indicator {
      display: inline-block;
      vertical-align: middle;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid transparent;
      border-left: 2px solid #fff;
      animation: spin 1s linear infinite;

      & + .content {
        margin-left: 8px;
      }
    }
  }

  .icon {
    & + .content {
      margin-left: 6px;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>