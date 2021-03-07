<template>
  <div class="tabs-doc">
    <h1 style="margin-bottom: 12px;">示例1-基本用法</h1>
    <div style="margin-bottom: 24px;">
      <Tabs v-model:activeKey="activeKey">
        <Tab title="导航22221" :key="1">1111Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Tab>
        <Tab title="导航2" :key="2">2222Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Tab>
        <Tab title="导航3" :key="3" disabled>3333Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Tab>
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