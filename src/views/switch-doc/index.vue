<template>
  <div class="switch-doc">
    <h1>Switch 组件示例 </h1>
    <Demo :component="normalDemo"></Demo>
    <Demo :component="disabledDemo"></Demo>
    <Switch size="large" v-model:checked="sizeChecked" checked-color="green" unchecked-color="red">
      <template #checked>ON</template>
      <template #unchecked>OFF</template>
    </Switch>
    <Switch size="medium" v-model:checked="sizeChecked" loading>
      <template #checked>ON</template>
      <template #unchecked>OFF</template>
    </Switch>
    <Switch size="small" v-model:checked="sizeChecked">
      <template #checked>ON</template>
      <template #unchecked>OFF</template>
    </Switch>
  </div>
</template>

<script lang="ts">
import normalDemo from './components/normal-demo.vue'
import disabledDemo from './components/disabled-demo.vue'
import Demo from '../../components/demo.vue'
import Switch from '../../lib/switch.vue'
import {ref} from 'vue'

export default {
  name: "switch-doc",
  components: { Demo, Switch },
  setup() {
    const sizeChecked = ref(false)
    return { normalDemo, disabledDemo, sizeChecked }
  }
}
</script>