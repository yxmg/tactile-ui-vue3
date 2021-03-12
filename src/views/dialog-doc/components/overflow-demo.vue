<demo-sign>溢出处理</demo-sign>
<template>
  <Dialog title="基本用法">
    <template #trigger>
      <Button>溢出处理</Button>
    </template>
    <div style="height: 1000px;">
      <ul style="list-style: circle;padding: 20px">
        <li>默认content最大高度为80%页高。</li>
        <li>如需自定义，可用CSS控制 .t-dialog-content 的 max-height </li>
        <li><strong>全屏模式下默认整页滚动（90%页高）</strong>如需content滚动请用CSS设置 overflow:auto</li>
        <li>另外<strong>滚动穿透</strong>请自行处理，如有必要考虑下个版本加入处理</li>
      </ul>
    </div>
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