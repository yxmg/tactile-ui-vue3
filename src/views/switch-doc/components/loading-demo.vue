<demo-sign>支持loading</demo-sign>
<template>
  <Switch v-model:checked="checked" />
  <Switch v-model:checked="checked" loading/>
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