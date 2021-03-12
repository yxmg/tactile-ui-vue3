<demo-sign>自定义动画</demo-sign>
<template>
  <Dialog title="默认缩放">
    <template #trigger>
      <Button>默认缩放</Button>
    </template>
    默认缩放，可以使用内置transition，也可以通过CSS自定义transition
  </Dialog>

  <Dialog title="水平滑入滑出" transition="slide-right">
    <template #trigger>
      <Button>水平滑入滑出</Button>
    </template>
    水平滑入滑出
  </Dialog>

  <Dialog title="垂直滑入滑出" transition="slide-bottom">
    <template #trigger>
      <Button>垂直滑入滑出</Button>
    </template>
    垂直滑入滑出
  </Dialog>
</template>

<script>
import Button from '../../../lib/button.vue'
import Dialog from '../../../lib/dialog.vue'
import { ref } from 'vue'

export default {
  name: "transition",
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