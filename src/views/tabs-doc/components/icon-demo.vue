<demo-sign>设置图标</demo-sign>
<template>
  <Tabs v-model:activeKey="activeKey">
    <Tab title="Vue" key="Vue" icon="Vue">
      Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。
    </Tab>
    <Tab title="React" key="React" icon="React">
      React 是一个用于构建用户界面的 JavaScript 库。
    </Tab>
    <Tab title="Angular" key="Angular" icon="Angular">
      Angular 是一个应用设计框架与开发平台，用于创建高效、复杂、精致的单页面应用。
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
    return { activeKey }
  }
}
</script>