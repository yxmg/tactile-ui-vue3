<template>
  <div class="tabs-doc">
    <h1 style="margin-bottom: 12px;">示例1-基本用法</h1>
    <div style="margin-bottom: 24px;">
      <Tabs v-model:activeKey="activeKey">
        <Tab title="导航22221" :key="1">内容1</Tab>
        <Tab title="导航2" :key="2">内容2</Tab>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts">
import Tabs from '../lib/tabs.vue'
import Tab from '../lib/tab.vue'
import {ref} from 'vue'

export default {
  name: 'tabs-doc',
  components: { Tab, Tabs },
  setup() {
    const activeKey = ref(1)
    return { activeKey }
  }
}
</script>

<style scoped>

</style>