<p align="center">
  <a href="https://www.antdv.com/">
  <img width="200" src="https://ae01.alicdn.com/kf/U1ac5b63e84ec46e781f1df4d442eb19bR.jpg">
  </a>
</p>

<h1 align="center">
  <a href="https://github.com/yxmg/tactile-ui-vue3" target="_blank">Tactile UI</a>
</h1>

<div align="center">

Tactile[ˈtæktaɪl] UI, A tactile UI components based on Vue3 and Typescript.

[![custom](https://img.shields.io/badge/UI--lib-tactile--ui-brightgreen)](https://github.com/yxmg/tactile-ui-vue3)
[![npm package](https://img.shields.io/npm/v/tactile-ui-vue3?color=007ec6)](https://www.npmjs.com/package/tactile-ui-vue3)
[![npm package](https://img.shields.io/npm/l/tactile-ui-vue3?color=%23007ec6)](https://www.npmjs.com/package/tactile-ui-vue3)
[![npm package](https://img.shields.io/npm/dependency-version/tactile-ui-vue3/peer/vue)](https://www.npmjs.com/package/tactile-ui-vue3)
[![npm package](https://img.shields.io/npm/dependency-version/tactile-ui-vue3/peer/@vue/compiler-sfc)](https://www.npmjs.com/package/tactile-ui-vue3)



</div>

> ~~FBI~~ Warning: The original intention of this project is to learn Vue3. At present, there are too few components and no unit testing. It is not recommended to be used in a production environment, but it can be used as a learning project or used in a small project. I will add this part as soon as possible~😄

## Features

- Simple and easy-to-use component API
- Lightweight, try not to rely on third-party libraries
- High-quality Vue components out of the box.

## Documentation

[Documentation](https://yxmg.github.io/tactile-ui-vue3-site/#/)

![doc preview](https://ae01.alicdn.com/kf/Uf711f3a83bea4de4845a0338fa629d6bf.jpg)

## Install

```bash
$ yarn add tactile-ui-vue3

or

$ npm install tactile-ui-vue3 --save
```

If you are in a bad network environment，you can try other registries and tools like [cnpm](https://github.com/cnpm/cnpm)
.

## Import

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

## Usage

Now, let's use components

```html

<t-button theme="primary">primary</t-button>
<t-button theme="success">success</t-button>
<t-button theme="danger">danger</t-button>

<t-switch>
  <template #checked>Vue3</template>
  <template #unchecked>Vue2</template>
</t-switch>
```

If you wanna explore more usages, here's a playground
on [CodeSandBox.io](https://codesandbox.io/s/tactile-ui-vue3-playground-cdccd?file=/src/App.vue).

## Note

This UI library will reset some styles as followed. I strongly recommend you to add these styles to all of your projects
for saving time to find CSS bugs :)

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

## License

[MIT](https://opensource.org/licenses/MIT)