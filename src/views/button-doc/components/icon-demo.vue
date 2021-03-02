<demo-sign>图标</demo-sign>
<template>
  <Button theme="primary" icon="search">Search</Button>
  <Button theme="primary" icon="check">Submit</Button>
  <Button theme="primary" icon="download">Download</Button>
  <Button icon="left">Back</Button>
</template>

<script lang="ts">
import Button from '../../../lib/button.vue'

export default {
  components: { Button }
}
</script>