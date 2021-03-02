<demo-sign>键盘操作（Click &gt; Tab/shiftTab &gt; Enter/Space）</demo-sign>
<template>
  <Button theme="default" @click="onClick" autofocus>default</Button>
  <Button theme="primary" @click="onClick">primary</Button>
  <Button theme="danger" @click="onClick">danger</Button>
  <Button theme="success" @click="onClick">success</Button>
</template>

<script lang="ts">
import Button from '../../../lib/button.vue'

export default {
  components: { Button },
  setup() {
    const onClick = () => {
      alert('button click')
    }
    return { onClick }
  }
}
</script>