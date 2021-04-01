<template>
  <button
    class="t-switch"
    :class="switchClass"
    :style="switchStyle"
    :disabled="privateDisabled"
    @click="toggleChecked()"
    @keydown.left.right="handleKeyboard"
  >
    <input type="hidden" :value="currentChecked" :disabled="privateDisabled">
    <span class="t-switch-animate-bg" :style="{ backgroundColor: uncheckedColor }"></span>
    <span class="t-switch-inner">
      <slot name="checked" v-if="currentChecked === checkedValue"></slot>
      <slot name="unchecked" v-else></slot>
    </span>
    <span class="t-switch-thumb"></span>
  </button>
</template>

<script lang="ts">
import {defineComponent, computed, ref, watch} from 'vue'

export default defineComponent({
  name: "t-switch",
  props: {
    checked: {
      type: [String, Number, Boolean],
      default: false
    },
    size: {
      type: String,
      default: 'normal'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    checkedColor: {
      type: String,
      default: '#1890ff'
    },
    uncheckedColor: {
      type: String,
      default: '#bfbfbf'
    },
    checkedValue: {
      type: [String, Number, Boolean],
      default: true
    },
    uncheckedValue: {
      type: [String, Number, Boolean],
      default: false
    }
  },
  emits: ['update:checked', 'change'],
  setup(props, context) {
    const currentChecked = ref(props.checked)
    watch(() => props.checked, (checked) => {
      if (checked !== props.checkedValue && checked !== props.uncheckedValue) {
        throw new Error('值不合法，必须为checkValue或uncheckedValue的一个')
      }
      currentChecked.value = checked
    })
    const toggleChecked = (currentVal = currentChecked.value) => {
      const checked = currentVal === props.checkedValue
        ? props.uncheckedValue : props.checkedValue
      currentChecked.value = checked
      context.emit('update:checked', checked)
      context.emit('change', checked)
    }
    const privateDisabled = computed(() => props.disabled || props.loading)
    const switchStyle = computed(() => ({
      backgroundColor: currentChecked.value === props.checkedValue ? props.checkedColor : props.uncheckedColor
    }))
    const switchClass = computed(() => ({
      checked: currentChecked.value === props.checkedValue,
      [`t-switch-${props.size}`]: props.size,
      [`t-switch-disabled`]: privateDisabled.value,
      [`t-switch-loading`]: props.loading
    }))
    const handleKeyboard = (event: KeyboardEvent) => {
      const KEY_CODE_MAP = { LEFT: 37, RIGHT: 39 }
      if (KEY_CODE_MAP.LEFT === event.keyCode && currentChecked.value === props.checkedValue) {
        toggleChecked(props.checkedValue)
      } else if (KEY_CODE_MAP.RIGHT === event.keyCode && currentChecked.value === props.uncheckedValue) {
        toggleChecked(props.uncheckedValue)
      }
    }

    return { toggleChecked, switchStyle, switchClass, privateDisabled, currentChecked, handleKeyboard }
  }
})
</script>

<style lang="scss">
$switchHeight: 22px;
$smallSwitchWidth: 28px;
$smallSwitchHeight: 16px;
$largeSwitchWidth: 56px;
$largeSwitchHeight: 32px;
$ballHeight: $switchHeight - 4px;
$smallBallHeight: $smallSwitchHeight - 4px;
$largeBallHeight: $largeSwitchHeight - 6px;

.t-switch {
  display: inline-block;
  height: $switchHeight;
  line-height: $switchHeight - 2px;
  min-width: $switchHeight*2;
  border: none;
  background: #bfbfbf;
  border-radius: $switchHeight / 2;
  position: relative;
  outline: none;
  transition: background-color 0.1s linear;
  user-select: none;
  color: #fff;
  cursor: pointer;

  &:focus {
    box-shadow: 0 0 0 2px rgba(24, 144, 255, .2);
  }

  &:focus:not(:focus-visible) {
    box-shadow: none;
  }

  &.checked {
    background-color: #1890ff;

    .t-switch-animate-bg {
      transform: scale(0);
    }

    &:not(.t-switch-disabled):active {
      .t-switch-thumb {
        width: $ballHeight + 4px;
        margin-left: -4px;
      }
    }

    .t-switch-thumb {
      left: calc(100% - #{$ballHeight} - 2px);
    }

    .t-switch-inner {
      font-size: 14px;
      margin-left: 8px;
      margin-right: 24px;
    }
  }

  .t-switch-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    height: $ballHeight;
    width: $ballHeight;
    background: white;
    border-radius: $ballHeight / 2;
    transition: left .35s cubic-bezier(.45, 1, .4, 1), width .35s cubic-bezier(.45, 1, .4, 1), margin .35s cubic-bezier(.45, 1, .4, 1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
  }

  .t-switch-inner {
    position: relative;
    font-size: 14px;
    margin-left: 24px;
    margin-right: 8px;
  }

  &-disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  &-loading {
    .t-switch-thumb {
      &:after {
        content: '';
        position: absolute;
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        left: 2px;
        top: 2px;
        border: 2px solid transparent;
        border-right: 2px solid #1890ff;
        border-radius: 50%;
        box-sizing: border-box;
        animation: spin 1s linear infinite;
      }
    }
  }

  &-animate-bg {
    display: inline-block;
    position: absolute;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border-radius: 1000px;
    top: 2px;
    left: 2px;
    transition: transform .35s cubic-bezier(.45, 1, .4, 1);
  }

  &:not(.t-switch-disabled):active {
    .t-switch-thumb {
      width: $ballHeight + 4px;
    }
  }

  &-small {
    min-width: $smallSwitchWidth;
    height: $smallSwitchHeight;
    line-height: $smallSwitchHeight - 2px;

    .t-switch-inner {
      font-size: 12px;
      margin-left: 18px;
    }

    .t-switch-thumb {
      width: $smallBallHeight;
      height: $smallBallHeight;
      border-radius: $smallBallHeight / 2;
    }

    &:not(.t-switch-disabled):active {
      .t-switch-thumb {
        width: $smallBallHeight + 2px;
      }
    }

    &.checked {
      .t-switch-inner {
        font-size: 12px;
        margin-right: 18px;
      }

      &:not(.t-switch-disabled):active {
        .t-switch-thumb {
          width: $smallBallHeight + 2px;
          margin-left: -2px;
        }
      }

      > .t-switch-thumb {
        left: calc(100% - #{$smallBallHeight} - 2px);
      }
    }
  }

  &-large {
    min-width: $largeSwitchWidth;
    height: $largeSwitchHeight;
    line-height: $largeSwitchHeight - 2px;
    border-radius: $largeSwitchHeight / 2;

    .t-switch-thumb {
      width: $largeBallHeight;
      height: $largeBallHeight;
      border-radius: $largeBallHeight / 2;
      left: 3px;
      top: 3px;
    }

    .t-switch-inner {
      font-size: 16px;
      margin-left: 36px;
    }

    &:not(.t-switch-disabled):active {
      .t-switch-thumb {
        width: $largeBallHeight + 4px;
      }
    }

    &.checked {
      &:not(.t-switch-disabled):active {
        .t-switch-thumb {
          width: $largeBallHeight + 4px;
        }
      }

      .t-switch-thumb {
        left: calc(100% - #{$largeBallHeight} - 3px);
      }

      .t-switch-inner {
        font-size: 16px;
        margin-right: 36px;
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