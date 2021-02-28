<template>
  <button
    class="t-switch"
    :class="{
      checked,
      [`t-switch-${size}`]: size,
      [`t-switch-disabled`]: disabled
     }"
    :style="{
      backgroundColor: checked ? checkedColor : uncheckedColor
    }"
    :disabled="disabled"
    @click="toggleChecked"
  >
    <input type="hidden" :value="checked" :disabled="disabled">
    <span class="t-switch-animate-bg" :style="{ backgroundColor: uncheckedColor }"></span>
    <span class="t-switch-inner"></span>
  </button>
</template>

<script lang="ts">
export default {
  name: "Switch",
  props: {
    checkedColor: {
      type: Boolean,
      default: '#1890ff'
    },
    uncheckedColor: {
      type: Boolean,
      default: '#bfbfbf'
    },
    checked: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const toggleChecked = (event) => {
      context.emit('update:checked', !props.checked)
    }
    return { toggleChecked }
  }
}
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
  width: $switchHeight*2;
  border: none;
  background: #bfbfbf;
  border-radius: $switchHeight / 2;
  position: relative;
  outline: none;
  transition: background-color 0.1s linear;
  user-select: none;

  .t-switch-inner {
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

  &-disabled {
    cursor: not-allowed;
    opacity: 0.4;
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
    .t-switch-inner {
      width: $ballHeight + 4px;
    }
  }

  &.checked {
    background-color: #1890ff;

    .t-switch-animate-bg {
      transform: scale(0);
    }

    &:not(.t-switch-disabled):active {
      .t-switch-inner {
        width: $ballHeight + 4px;
        margin-left: -4px;
      }
    }

    > .t-switch-inner {
      left: calc(100% - #{$ballHeight} - 2px);
    }
  }

  &-small {
    width: $smallSwitchWidth;
    height: $smallSwitchHeight;

    .t-switch-inner {
      width: $smallBallHeight;
      height: $smallBallHeight;
      border-radius: $smallBallHeight / 2;
    }

    &:active {
      .t-switch-inner {
        width: $smallBallHeight + 2px;
      }
    }

    &.checked {
      &:not(.t-switch-disabled):active {
        .t-switch-inner {
          width: $smallBallHeight + 2px;
          margin-left: -2px;
        }
      }

      > .t-switch-inner {
        left: calc(100% - #{$smallBallHeight} - 2px);
      }
    }
  }

  &-large {
    width: $largeSwitchWidth;
    height: $largeSwitchHeight;
    border-radius: $largeSwitchHeight / 2;

    .t-switch-inner {
      width: $largeBallHeight;
      height: $largeBallHeight;
      border-radius: $largeBallHeight / 2;
      left: 3px;
      top: 3px;
    }

    &:not(.t-switch-disabled):active {
      .t-switch-inner {
        width: $largeBallHeight + 4px;
      }
    }

    &.checked {
      &:not(.t-switch-disabled):active {
        .t-switch-inner {
          width: $largeBallHeight + 4px;
        }
      }

      .t-switch-inner {
        left: calc(100% - #{$largeBallHeight} - 3px);
      }
    }
  }
}
</style>