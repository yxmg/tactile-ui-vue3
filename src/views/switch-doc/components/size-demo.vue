<demo-sign>尺寸</demo-sign>
<template>
  <Switch v-model:checked="checked" size="large"/>
  <Switch v-model:checked="checked"/>
  <Switch v-model:checked="checked" size="small"/>
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
