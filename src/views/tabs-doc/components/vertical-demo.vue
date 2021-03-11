<demo-sign>垂直Tab</demo-sign>
<template>
  <Tabs v-model:activeKey="activeKey" vertical>
    <Tab title="Vue" key="Vue">
      Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

      如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带你了解其核心概念和一个示例工程。

      如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。

      尝试 Vue.js 最简单的方法是使用 Hello World 例子，你可以在浏览器新标签页中打开它，跟着例子学习一些基础用法。
    </Tab>
    <Tab title="React" key="React">
      React（有时叫React.js或ReactJS），是一个为数据提供渲染为HTML视图的开源JavaScript 库。React视图通常采用包含以自定义HTML标记规定的其他组件的组件渲染。React为程序员提供了一种子组件不能直接影响外层组件（"data flows down"）的模型，数据改变时对HTML文档的有效更新，和现代单页应用中组件之间干净的分离。

      它由Facebook、Instagram和一个由个人开发者和企业组成的社群维护。根据JavaScript分析服务Libscore，React目前正在被Netflix、Imgur、Bleacher Report、Feedly、Airbnb、SeatGeek、HelloSign等很多网站的主页使用。
    </Tab>
    <Tab title="Angular" key="Angular">
      Angular (通常是指 "Angular 2+" 或 "Angular v2 及更高版本") 是一个基于 TypeScript 的 开源 Web 应用框架 由 Google 的 Angular 团队以及社区共同领导。Angular 是由 AngularJS 的同一个开发团队完全重写的。

      最初，团队将这份 AngularJS 的重写版本称为 “Angular 2”，但这在开发人员之间引起了混乱。为了明确起见，该团队宣布应该为这两个框架分别使用各自的术语，其中 “AngularJS” 专指 1.X 版本，而不带 “JS” 的 “Angular” 则专指版本2及更高版本。
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