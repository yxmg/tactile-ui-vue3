<demo-sign>基本用法</demo-sign>
<template>
  <Button @click="visible=true">外部触发器</Button>
  <Dialog title="基本用法" v-model:visible="visible">visible受控</Dialog>

  <Dialog title="基本用法">
    <template #trigger>
      <Button>slot触发器</Button>
    </template>
    visible不受控
  </Dialog>
</template>

<script>
import Switch from '../../../lib/switch.vue'
import Button from '../../../lib/button.vue'
import Dialog from '../../../lib/dialog.vue'
import { ref } from 'vue'

export default {
  name: "normal",
  components: { Switch, Button, Dialog },
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