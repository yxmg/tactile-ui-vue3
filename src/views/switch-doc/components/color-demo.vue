<demo-sign>颜色</demo-sign>
<template>
  <Switch v-model:checked="checked"/>
  <Switch v-model:checked="checked" checked-color="#00bc70" unchecked-color="#f5222d"/>
</template>

<script lang="ts">
import Switch from '../../../lib/switch.vue'
import {ref} from 'vue'

export default {
  components: { Switch },
  setup() {
    const checked = ref(true)
    return { checked }
  }
}
</script>