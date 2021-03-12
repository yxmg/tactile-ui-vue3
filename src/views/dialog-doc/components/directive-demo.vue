<demo-sign>命令式调用</demo-sign>
<template>
  <Button @click="open">openDialog创建</Button>
</template>

<script>
import { openDialog } from '../../../lib/open-dialog'
import Button from '../../../lib/button.vue'

export default {
  name: "directive",
  components: { Button },
  setup() {
    const open = () => {
      openDialog({ title: '命令式调用', content: '轻量化场景' })
    }
    return { open }
  }
}
</script>

<style lang="scss" scoped>
.t-button {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>