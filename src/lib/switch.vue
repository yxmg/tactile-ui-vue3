<template>
  <button
    class="t-switch"
    :class="{ checked }"
    @click="toggleChecked"
  >
    <span></span>
  </button>
</template>

<script lang="ts">
export default {
  name: "Switch",
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const toggleChecked = () => {
      context.emit('update:checked', !props.checked)
    }
    return {toggleChecked}
  }
}
</script>

<style lang="scss">
$switchHeight: 22px;
$ballHeight: $switchHeight - 4px;
.t-switch {
  height: $switchHeight;
  width: $switchHeight*2;
  border: none;
  background: #bfbfbf;
  border-radius: $switchHeight / 2;
  position: relative;
  outline: none;
  transition: background-color 0.25s linear;

  span {
    position: absolute;
    top: 2px;
    left: 2px;
    height: $ballHeight;
    width: $ballHeight;
    background: white;
    border-radius: $ballHeight / 2;
    transition: left 0.25s linear, width 0.25s linear, margin 0.25s linear;
  }

  &:active {
    > span {
      width: $ballHeight + 4px;
    }
  }

  &.checked {
    background-color: #1890ff;

    &:active {
      > span {
        width: $ballHeight + 4px;
        margin-left: -4px;
      }
    }

    > span {
      left: calc(100% - #{$ballHeight} - 2px);
    }
  }
}
</style>