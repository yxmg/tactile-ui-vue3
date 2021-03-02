<demo-sign>block</demo-sign>
<template>
  <Button theme="default" block>default</Button>
  <Button theme="primary" block>primary</Button>
  <Button theme="danger" block>danger</Button>
  <Button theme="success" block>success</Button>
</template>

<script lang="ts">
import Button from '../../../lib/button.vue'

export default {
  components: { Button }
}
</script>