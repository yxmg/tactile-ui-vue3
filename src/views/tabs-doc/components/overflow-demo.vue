<demo-sign>多标签下体验优化</demo-sign>
<template>
  <Tabs v-model:activeKey="activeKey">
    <Tab :title="'导航 ' + n" :key="n" v-for="n in length">
      内容 {{ n }}
    </Tab>
  </Tabs>
</template>

<script lang="ts">
import Tabs from '../../../lib/tabs.vue'
import Tab from '../../../lib/tab.vue'
import {ref} from 'vue'

export default {
  components: { Tabs, Tab },
  setup() {
    const activeKey = ref('Vue')
    const length = ref(30)
    return { activeKey, length }
  }
}
</script>