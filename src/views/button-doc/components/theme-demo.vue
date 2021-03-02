<demo-sign>主题</demo-sign>
<template>
  <Button theme="default">default</Button>
  <Button theme="primary">primary</Button>
  <Button theme="danger">danger</Button>
  <Button theme="success">success</Button>
</template>

<script lang="ts">
import Button from '../../../lib/button.vue'

export default {
  components: { Button }
}
</script>