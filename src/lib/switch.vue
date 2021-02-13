<template>
  <button :class="{ checked }" @click="toggleChecked">
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

<style lang="scss" scoped>
$switchHeight: 22px;
$ballHeight: $switchHeight - 4px;
button {
  height: $switchHeight;
  width: $switchHeight*2;
  border: none;
  background: gray;
  border-radius: $switchHeight / 2;
  position: relative;
  outline: none;

  &.checked {
    background-color: blue;

    > span {
      left: calc(100% - #{$ballHeight} - 2px);
    }
  }
}

span {
  position: absolute;
  top: 2px;
  left: 2px;
  height: $ballHeight;
  width: $ballHeight;
  background: white;
  border-radius: $ballHeight / 2;
  transition: left 0.25s linear;
}
</style>