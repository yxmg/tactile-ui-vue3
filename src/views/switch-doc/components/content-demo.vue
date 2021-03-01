<demo-sign>内容</demo-sign>
<template>
  <Switch v-model:checked="checked">
    <template #checked>开</template>
    <template #unchecked>关</template>
  </Switch>
  <Switch v-model:checked="checked">
    <template #checked>
      <svg class="icon"><use xlink:href="#icon-check"></use></svg>
    </template>
    <template #unchecked>
      <svg class="icon"><use xlink:href="#icon-close"></use></svg>
    </template>
  </Switch>
  <Switch v-model:checked="checked">
    <template #checked>ON</template>
    <template #unchecked>OFF</template>
  </Switch>
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