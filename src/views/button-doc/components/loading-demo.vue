<demo-sign>loading</demo-sign>
<template>
  <Button @click="toggleLoading">切换Loading</Button>
  <br/>
  <Button theme="default" :loading="loading">default</Button>
  <Button theme="default" size="small" :loading="loading">primary</Button>
  <br/>
  <Button theme="primary" :loading="loading">primary</Button>
  <Button theme="primary" size="small" :loading="loading">primary</Button>
  <br/>
  <Button shape="circle" :loading="loading"></Button>
  <Button shape="circle" :loading="loading" theme="danger"></Button>
  <Button shape="circle" :loading="loading" theme="success"></Button>
</template>

<script lang="ts">
import Button from '../../../lib/button.vue'
import {ref} from 'vue'

export default {
  components: { Button },
  setup() {
    const loading = ref(true)
    const toggleLoading = () => {
      loading.value = !loading.value
    }
    return { loading, toggleLoading }
  }
}
</script>