<template>
  <button
    class="t-button"
    :class="classes"
  >
    <span class="loading-indicator"></span>
    <slot name="icon"/>
    <span v-if="$slots.default"><slot/></span>
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
    // 尺寸，可选值：large、medium、small
    size: {
      type: String,
      default: 'medium'
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
    link: {
      type: Boolean,
      default: false
    },
    // TODO：图标，支持内置ICON、RF、slot
    icon: {}
  },
  setup(props) {
    const {theme, size, shape, link, loading, block, disabled} = props
    const classes = computed(() => {
      return {
        [`t-theme-${theme}`]: theme,
        [`t-size-${size}`]: size,
        [`t-shape-${shape}`]: shape,
        't-link-button': link,
        't-loading-button': loading,
        't-block-button': block,
        't-disabled-button': disabled,
      }
    })
    return {classes}
  }
}
</script>

<style lang="scss">
$primary-color: #1890ff;
$success-color: #52c41a;
$danger-color: #f5222d;

.t-button {
  display: inline-block;
  position: relative;
  line-height: 1.5;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  box-shadow: 0 2px 0 rgba(0, 0, 0, .015);
  cursor: pointer;
  transition: all .3s cubic-bezier(.645, .045, .355, 1);
  // 用户选择文本
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  // 只允许滚动和缩放
  touch-action: manipulation;
  height: 44px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  color: rgba(0, 0, 0, .65);
  background-color: #fff;
  border: 1px solid #d9d9d9;

  .content {
    margin-left: 4px;
  }

  &,
  &:active,
  &:focus {
    outline: none;
  }

  &::after {
    background-color: currentColor;
    border-radius: inherit;
    bottom: 0;
    color: inherit;
    content: "";
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity .2s cubic-bezier(.4, 0, .6, 1);
  }

  &:active::after {
    background-color: #000000;
  }

  &:hover::after {
    opacity: .08;
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
    border-color: $primary-color
  }

  &.t-theme-danger {
    color: #ffffff;
    background-color: $danger-color;
    border-color: $danger-color;
  }

  &.t-theme-success {
    color: #ffffff;
    background-color: $success-color;
    border-color: $success-color;
  }

  &.t-size-large {
    height: 52px;
    padding: 0 20px;
    font-size: 18px;
  }

  &.t-size-small {
    padding: 0 12px;
    font-size: 14px;
    height: 36px;
  }

  &.t-disabled-button {
    background-color: #f5f5f5;
    color: rgba(0, 0, 0, .25);
    border-color: #d9d9d9;
    cursor: not-allowed;

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
    min-width: 44px;
    padding: 0;
    border-radius: 50%;
  }

  &.t-link-button {
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
    > .loading-indicator {
      display: inline-block;
      vertical-align: middle;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid transparent;
      border-left: 2px solid #fff;
      animation: spin 1s linear infinite;

      & + span {
        margin-left: 8px;
      }
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