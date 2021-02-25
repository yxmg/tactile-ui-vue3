<demo-sign>基本用法</demo-sign>
<template>
  <Switch v-model:checked="checked"></Switch>
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