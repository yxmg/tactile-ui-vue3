<template>
  <button :class="{ checked }" @click="toggleChecked">
    <span></span>
  </button>
</template>

<script lang="ts">
import {ref} from 'vue'

export default {
  name: "switch",
  setup() {
    const checked = ref(false)
    const toggleChecked = () => {
      checked.value = !checked.value
    }
    return {checked, toggleChecked}
  }
}
</script>

<style lang="scss" scoped>
$h: 22px;
$h2: $h - 4px;
button {
  height: $h;
  width: $h*2;
  border: none;
  background: gray;
  border-radius: $h / 2;
  position: relative;
  outline: none;
}

span {
  position: absolute;
  top: 2px;
  left: 2px;
  height: $h2;
  width: $h2;
  background: white;
  border-radius: $h2 / 2;
  transition: left 0.25s linear;
}

button.checked {
  background-color: blue;

  > span {
    left: calc(100% - #{$h2} - 2px);
  }
}
</style>