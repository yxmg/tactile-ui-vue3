<template>
  <button
    class="t-button"
    :class="classes"
  >
    <slot/>
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
    // 幽灵按钮
    ghost: {
      type: Boolean,
      default: false
    },
    // TODO：图标，支持内置ICON、RF
    icon: {}
  },
  setup(props) {
    const {theme, size, shape, link, ghost, loading, block, disabled} = props
    const classes = computed(() => {
      return {
        [`t-theme-${theme}`]: theme,
        [`t-size-${size}`]: size,
        [`t-shape-${shape}`]: shape,
        't-link-button': link,
        't-ghost-button': ghost,
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

  &,
  &:active,
  &:focus {
    outline: none;
  }
}
</style>