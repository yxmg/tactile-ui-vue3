<template>
  <div>
    <h1 style="margin-bottom: 12px;">示例1-基本用法</h1>
    <div style="margin-bottom: 24px;">

      <Dialog v-model:visible="visible[1]" mask-closable :ok="onOK" title="标题">
        <template #trigger>
          <Button theme="primary">打开弹窗</Button>
        </template>
        <template #title>
          <strong>标题</strong>
        </template>
        <div>测试</div>
      </Dialog>
    </div>
    <h1 style="margin-bottom: 12px;">示例2-编程式调用</h1>
    <div style="margin-bottom: 24px;">
      <Button theme="primary" @click="showDialogByCall(1)">打开弹窗</Button>
    </div>
  </div>
</template>

<script>
import Dialog from "../lib/dialog.vue"
import Button from "../lib/button.vue"
import { reactive } from 'vue'
import { openDialog } from "../lib/open-dialog"

export default {
  name: "dialog-doc",
  components: { Dialog, Button },
  setup() {
    const visible = reactive([false])
    const toggleDialog = (index) => {
      visible[index] = !visible[index]
    }
    const onOK = () => {
      return false
    }
    const showDialogByCall = () => {
      openDialog({ title: '标题', content: '内容' })
    }
    return { visible, toggleDialog, onOK, openDialog, showDialogByCall }
  }
}
</script>

<style scoped>

</style>