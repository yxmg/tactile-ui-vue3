<p align="center">
  <a href="https://www.antdv.com/">
  <img width="200" src="https://ae01.alicdn.com/kf/U1ac5b63e84ec46e781f1df4d442eb19bR.jpg">
  </a>
</p>

<h1 align="center">
  <a href="https://github.com/yxmg/tactile-ui-vue3" target="_blank">Tactile UI</a>
</h1>

<div align="center">

Tactile[ˈtæktaɪl] UI, 一个富有质感的UI组件库，基于Vue3和Typescript

[![custom](https://img.shields.io/badge/UI--lib-tactile--ui-brightgreen)](https://github.com/yxmg/tactile-ui-vue3)
[![npm package](https://img.shields.io/npm/v/tactile-ui-vue3?color=007ec6)](https://www.npmjs.com/package/tactile-ui-vue3)
[![npm package](https://img.shields.io/npm/l/tactile-ui-vue3?color=%23007ec6)](https://www.npmjs.com/package/tactile-ui-vue3)
[![npm package](https://img.shields.io/npm/dependency-version/tactile-ui-vue3/peer/vue)](https://www.npmjs.com/package/tactile-ui-vue3)
[![npm package](https://img.shields.io/npm/dependency-version/tactile-ui-vue3/peer/@vue/compiler-sfc)](https://www.npmjs.com/package/tactile-ui-vue3)



</div>

> ~~FBI~~ Warning: 本项目初衷是学习Vue3。目前组件数量太少且没有单元测试，不推荐在生产中使用，但可以将其作为学习项目或用于小型项目中。后续会尽快补充上这部分~😄

[English](./README.md) | 简体中文

## 特性

- 简单易用的组件API
- 轻量，尽量不依赖第三方库
- 开箱即用的高质量Vue组件。

## 文档

[文档地址](https://yxmg.github.io/tactile-ui-vue3-site/#/)

![doc preview](https://ae01.alicdn.com/kf/Uf711f3a83bea4de4845a0338fa629d6bf.jpg)

## 安装

```bash
$ yarn add tactile-ui-vue3

or

$ npm install tactile-ui-vue3 --save
```

如果您的网络环境很差，可以尝试使用其他工具，例如[cnpm](https://github.com/cnpm/cnpm)
.

## 引入

```javascript
// main.js

// Import the library
import { Button, Switch, Dialog, Tabs, Tab } from 'tactile-ui-vue3'
import 'tactile-ui-vue3/dist/lib/tactile-ui.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// Register components that you need 
app.component(Button.name, Button)
app.component(Switch.name, Switch)
app.component(Dialog.name, Dialog)
app.component(Tabs.name, Tabs)
app.component(Tab.name, Tab)

app.mount('#app')
```

## 用法

```html

<t-button theme="primary">primary</t-button>
<t-button theme="success">success</t-button>
<t-button theme="danger">danger</t-button>

<t-switch>
  <template #checked>Vue3</template>
  <template #unchecked>Vue2</template>
</t-switch>
```

如果你想探索更多用法, 可以在 [CodeSandBox.io](https://codesandbox.io/s/tactile-ui-vue3-playground-cdccd?file=/src/App.vue) 尽情尝试。

## 注意

该UI库将按照以下方式重置一些样式。强烈建议您将这些样式添加到所有项目中用于节省时间查找CSS错误:)

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

## License

[MIT](https://opensource.org/licenses/MIT)