<demo-sign>自定义样式</demo-sign>
<template>
  <Dialog title="自定义头部和底部" ref="dialog1" hide-close>
    <template #trigger>
      <Button>自定义头部和底部</Button>
    </template>
    <template #title>
      <div style="width:100%;text-align:center; color: #f52631;">
        <svg class="icon">
          <use :xlink:href="`#icon-delete`"></use>
        </svg>
        <span style="margin-left: 10px;">删除确认</span>
      </div>
    </template>
    <template #footer>
      <Button theme="danger" @click="confirmDelete" block>确认</Button>
    </template>
    是否确认删除？
  </Dialog>
  <Dialog title="自定义宽度" :width="200">
    <template #trigger>
      <Button>自定义宽度</Button>
    </template>
    宽度：200px
  </Dialog>

  <Dialog title="隐藏footer" hide-footer>
    <template #trigger>
      <Button>隐藏footer</Button>
    </template>
    内容
  </Dialog>
</template>

<script>
import Switch from '../../../lib/switch.vue'
import Button from '../../../lib/button.vue'
import Dialog from '../../../lib/dialog.vue'
import { ref } from 'vue'

export default {
  name: "custom",
  components: { Switch, Button, Dialog },
  setup() {
    const dialog1 = ref(null)
    const confirmDelete = () => {
      dialog1.value.close()
    }
    return {
      confirmDelete, dialog1
    }
  }
}
</script>

<style lang="scss" scoped>
.t-button {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>