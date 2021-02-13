<template>
  <div>
    <Switch v-model:checked="switchValue"/>
  </div>
</template>

<script lang="ts">
import {ref} from 'vue'
import Switch from "../lib/switch.vue"

export default {
  name: "switch-doc",
  components: {Switch},
  setup() {
    const switchValue = ref(true)
    return {switchValue}
  }
}
</script>

<style scoped>

</style>