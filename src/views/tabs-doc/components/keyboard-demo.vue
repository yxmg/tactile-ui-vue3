<demo-sign>键盘操作（Click &gt; Tab/shiftTab &gt; Enter > ←/→ 滑动查看）</demo-sign>
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
    const length = ref(20)
    return { activeKey, length }
  }
}
</script>