<demo-sign>支持拖拽</demo-sign>
<template>
  <Dialog title="基本用法" :draggable="draggable">
    <template #trigger>
      <Button>可拖拽</Button>
    </template>
    <Switch v-model:checked="draggable">
      <template #checked>可拖拽</template>
      <template #unchecked>不可拖拽</template>
    </Switch>
    <div style="margin-top: 20px;">
      位移边界除顶部外，只能超出自身的一半，避免拽不回来
    </div>
  </Dialog>
</template>

<script>
import Switch from '../../../lib/switch.vue'
import Button from '../../../lib/button.vue'
import Dialog from '../../../lib/dialog.vue'
import { ref } from 'vue'

export default {
  name: "draggable",
  components: { Switch, Button, Dialog },
  setup() {
    const draggable = ref(true)
    return { draggable }
  }
}
</script>

<style lang="scss" scoped>
.t-button {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>