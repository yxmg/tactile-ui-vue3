<template>
  <div>
    <h1 style="margin-bottom: 12px;">示例1-基本用法</h1>
    <div style="margin-bottom: 24px;">
      <Button theme="primary" @click="toggleDialog(1)">打开弹窗</Button>
      <Dialog v-model:visible="visible[1]" mask-closable :ok="onOK"></Dialog>
    </div>
  </div>
</template>

<script>
import Dialog from "../lib/dialog.vue"
import Button from "../lib/button.vue"
import { reactive } from 'vue'

export default {
  name: "button",
  components: { Dialog, Button },
  setup() {
    const visible = reactive([false])
    const toggleDialog = (index) => {
      visible[index] = !visible[index]
    }
    const onOK = () => {
      console.log(1, "1")
      return false
    }
    return { visible, toggleDialog, onOK }
  }
}
</script>

<style scoped>

</style>