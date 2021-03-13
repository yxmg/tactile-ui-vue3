<demo-sign>自定义关闭方式</demo-sign>
<template>
  <Dialog title="允许所有" ref="dialog1">
    <template #trigger>
      <Button>允许所有</Button>
    </template>
    默认允许
    <ul style="list-style: circle;padding: 20px">
      <li>点击遮罩</li>
      <li>点击右上角关闭按钮</li>
      <li>Esc键</li>
      <li>点击确认、取消按钮关闭</li>
    </ul>
  </Dialog>

  <Dialog title="禁用点击遮罩关闭" :mask-closable="false">
    <template #trigger>
      <Button>禁用点击遮罩关闭</Button>
    </template>
    点击遮罩不会关闭
  </Dialog>

  <Dialog title="禁用Esc关闭" :esc-closable="false">
    <template #trigger>
      <Button>禁用Esc关闭</Button>
    </template>
    按下Esc键不会关闭
  </Dialog>

  <Dialog title="仅确认、取消、编程调用可关闭" :other-closable="false">
    <template #trigger>
      <Button>仅确认、取消、编程调用可关闭</Button>
    </template>
    除确认、取消、编程调用外不允许其他关闭
  </Dialog>

  <Dialog title="异步关闭" :other-closable="false" :ok="asyncOk" :ok-text="countdown + 's'">
    <template #trigger>
      <Button>异步关闭</Button>
    </template>
    异步关闭，常用于表单提交，需要在ok(props)中返回Promise（返回false则不关闭,自己玩去）
  </Dialog>
</template>

<script>
import Button from '../../../lib/button.vue'
import Dialog from '../../../lib/dialog.vue'
import { ref } from 'vue'

export default {
  components: { Button, Dialog },
  setup() {
    const dialog1 = ref(null)
    const confirmDelete = () => {
      dialog1.value.close()
    }
    let countdown = ref(3)
    const asyncOk = () => {
      return new Promise((resolve) => {
        for (let i = 1; i <= countdown.value; i++) {
          setTimeout(() => {
            countdown.value--
            if (countdown.value <= 0) {
              countdown.value = 3
              resolve()
            }
          }, i * 1000)
        }
      })
    }
    return { confirmDelete, dialog1, asyncOk, countdown }
  }
}
</script>

<style lang="scss" scoped>
.t-button {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>