<template>
  <div class="t-dialog-overlay"></div>
  <div class="t-dialog-wrapper">
    <div class="t-dialog-header">标题</div>
    <div class="t-dialog-content">内容</div>
    <div class="t-dialog-footer">
      <Button theme="primary">确认</Button>
      <Button>取消</Button>
    </div>
  </div>
</template>

<script lang="ts">
import Button from './button.vue'

export default {
  name: "dialog",
  components: { Button }
}
</script>

<style scoped>

</style>