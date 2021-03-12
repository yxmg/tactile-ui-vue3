<demo-sign>全屏</demo-sign>
<template>
  <Dialog title="全屏" fullscreen transition="slide-top">
    <template #trigger>
      <Button>全屏</Button>
    </template>
    <div style="height: 1000px;">常用于移动端</div>
  </Dialog>
</template>

<script>
import Button from '../../../lib/button.vue'
import Dialog from '../../../lib/dialog.vue'
import { ref } from 'vue'

export default {
  name: "normal",
  components: { Button, Dialog },
  setup() {
    const visible = ref(false)
    return { visible }
  }
}
</script>

<style lang="scss" scoped>
.t-button {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>