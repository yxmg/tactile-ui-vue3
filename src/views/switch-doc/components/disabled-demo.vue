<demo-sign>支持disabled</demo-sign>
<template>
  <Switch v-model:checked="checked" disabled></Switch>
</template>

<script lang="ts">
import Switch from '../../../lib/switch.vue'
import {ref} from 'vue'

export default {
  components: { Switch },
  setup() {
    const checked = ref(false)
    return { checked }
  }
}
</script>