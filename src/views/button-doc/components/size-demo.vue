<demo-sign>尺寸</demo-sign>
<template>
  <Tabs v-model:activeKey="currentTab">
    <Tab v-for="tab in tabList" :key="tab" :title="tab">
      <Button :size="tab">default</Button>
      <Button :size="tab" theme="primary">primary</Button>
      <Button :size="tab" theme="danger">danger</Button>
      <Button :size="tab" theme="success">success</Button>
      <br/>
      <br/>
      <Button :size="tab" shape="rect" theme="primary">Rect</Button>
      <Button :size="tab" shape="round" theme="primary">Round</Button>
      <Button :size="tab" shape="circle" theme="primary">C</Button>
    </Tab>
  </Tabs>
</template>

<script lang="ts">
import Button from '../../../lib/button.vue'
import Tabs from '../../../lib/tabs.vue'
import Tab from '../../../lib/tab.vue'
import {ref} from 'vue'

export default {
  components: { Button, Tabs, Tab },
  setup() {
    const tabList = ['large', 'normal', 'small']
    const currentTab = ref('large')
    return { tabList, currentTab }
  }
}
</script>