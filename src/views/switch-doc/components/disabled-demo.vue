<demo-sign>disabled</demo-sign>
<template>
  <Switch :disabled="disabled"></Switch>
  <Button @click="toggleDisabled">切换禁用</Button>
</template>

<script lang="ts">
import Switch from '../../../lib/switch.vue'
import Button from '../../../lib/button.vue'
import {ref} from 'vue'

export default {
  components: { Switch, Button },
  setup() {
    const disabled = ref(true)
    const toggleDisabled = () => {
      disabled.value = !disabled.value
    }
    return { disabled, toggleDisabled }
  }
}
</script>