<demo-sign>禁用Tab</demo-sign>
<template>
  <Tabs v-model:activeKey="activeKey">
    <Tab title="Vue3" :key="3">
      Vue3.0发布于2020年09月18日🎉，全新的代码组织方式，更好的性能，更方便的API...
    </Tab>
    <Tab title="Vue2" :key="2">
      Vue2.0发布于2016年10月1日，对Vue做了大幅度的重构，性能有了很大的提高，也为日后的跨端发展打下了基础。
    </Tab>
    <Tab title="Vue1" :key="1">
      Vue发布于2014年2月（WIKI）。在为AngularJS工作之后，Vue的作者尤雨溪开发出了这一框架。他声称自己的思路是提取Angular中为自己所喜欢的部分，构建出一款相当轻量的框架。
    </Tab>
    <Tab title="Jquery" :key="0" disabled>
      😅😅😅
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
    const activeKey = ref(3)
    return { activeKey }
  }
}
</script>