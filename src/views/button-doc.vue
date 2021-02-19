<template>
  <div>
    <div>Button示例</div>
    <h1>示例1</h1>
    <div>
      <Button theme="">你好</Button>
    </div>
  </div>
</template>

<script lang="ts">
import Button from '../lib/button.vue'

export default {
  name: "button-doc",
  components: {Button},
  setup() {
    const onClick = () => {
      console.log('hi')
    }
    return {onClick}
  }
}
</script>

<style scoped>

</style>