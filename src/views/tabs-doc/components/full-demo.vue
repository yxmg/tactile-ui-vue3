<demo-sign>完整例子</demo-sign>
<template>
  <Button @click="length++">添加Tab</Button>
  <Button @click="length > 1 && length-- ">删除Tab</Button>
  <Button @click="isVertical = !isVertical">切换方向</Button>
  <Button @click="firstItemDisabled = !firstItemDisabled">
    {{ firstItemDisabled ? '启用' : '禁用' }}第1项
  </Button>
  <a href="https://github.com/yxmg/tiny-ui-vue3" target="_blank">
    <Button>给个Star🤩</Button>
  </a>
  <Tabs v-model:activeKey="activeKey" :vertical="isVertical">
    <Tab
      v-for="(n,index) in length"
      :title="'导航 ' + n"
      :key="n"
      :disabled="index === 0 ? firstItemDisabled : false"
    >
      内容 {{ n }}
    </Tab>
  </Tabs>
</template>

<script lang="ts">
import Tabs from '../../../lib/tabs.vue'
import Tab from '../../../lib/tab.vue'
import Button from '../../../lib/button.vue'
import {ref} from 'vue'

export default {
  components: { Tabs, Tab, Button },
  setup() {
    const activeKey = ref('Vue')
    const length = ref(10)
    const isVertical = ref(false)
    const firstItemDisabled = ref(false)
    return { activeKey, length, isVertical, firstItemDisabled }
  }
}
</script>

<style lang="scss" scoped>
.t-button {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>