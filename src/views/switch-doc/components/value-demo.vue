<demo-sign>绑定开关值</demo-sign>
<template>
  <Switch v-model:checked="status" :unchecked-value="0" :checked-value="1">
    <template #checked>开</template>
    <template #unchecked>关</template>
  </Switch>
  {{ status }}
  <br/>
  <br/>
  <Switch
    v-model:checked="auditStatus"
    checked-color="#00bc70"
    checked-value="11"
    unchecked-value="10"
  >
    <template #unchecked>待审核</template>
    <template #checked>已审核</template>
  </Switch>
  "{{ auditStatus }}"
</template>

<script lang="ts">
import Switch from '../../../lib/switch.vue'
import {ref} from 'vue'

export default {
  components: { Switch },
  setup() {
    const status = ref(0)
    const auditStatus = ref('11')
    return { status, auditStatus }
  }
}
</script>