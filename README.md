<p align="center">
  <a href="https://www.antdv.com/">
    <img width="200" src="https://qn.antdv.com/logo.png">
  </a>
</p>

<h1 align="center">
  <a href="https://yxmg.github.io/tactile-ui-vue3-site/#/" target="_blank">Tactile UI</a>
</h1>

<div align="center">

Tactile[ˈtæktaɪl] UI, A tactile UI components based on Vue3 and Typescript.

[![npm package](https://img.shields.io/npm/v/ant-design-vue.svg?style=flat-square)](https://www.npmjs.org/package/ant-design-vue)

</div>

> ~~FBI~~ Warning: The original intention of this project is to learn Vue3. At present, there are too few components and no unit testing. It is not recommended to be used in a production environment, but it can be used as a learning project or used in a small project. I will add this part as soon as possible~😄

## Features 
- Simple and easy-to-use component API
- Lightweight, try not to rely on third-party libraries
- High-quality Vue components out of the box.


## Documentation

[Documentation](https://haixiang6123.github.io/overwatch-ui-doc/#/)

![](https://ae01.alicdn.com/kf/Uf711f3a83bea4de4845a0338fa629d6bf.jpg)

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
import { Button, Switch, Dialog, Tabs, Tab } from 'tiny-ui-vue3'
import 'tiny-ui-vue3/dist/lib/tactile-ui.css'

// Register components that you need 
Vue.component(Button.name, Button)
Vue.component(Switch.name, Switch)
Vue.component(Dialog.name, Dialog)
Vue.component(Tabs.name, Tabs)
Vue.component(Tab.name, Tab)

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
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

If you wanna explore more usages, here's a playground on [CodeSandBox.io]().

## Note
This UI library will reset some styles as followed.
I strongly recommend you to add these styles to all of your projects for saving time to find CSS bugs :)

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

## License
[MIT](https://opensource.org/licenses/MIT)