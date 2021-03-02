<demo-sign>disabled</demo-sign>
<template>
  <Button theme="default">default</Button>
  <Button theme="default" disabled>default</Button>
  <br/>
  <Button theme="primary">primary</Button>
  <Button theme="primary" disabled>primary</Button>
  <br/>
  <Button text>text</Button>
  <Button text disabled>text</Button>
  <br/>
  <Button shape="circle">C</Button>
  <Button shape="circle" disabled>C</Button>
</template>

<script lang="ts">
import Button from '../../../lib/button.vue'

export default {
  components: { Button }
}
</script>