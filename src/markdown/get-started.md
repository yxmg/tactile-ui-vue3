# 快速上手
## 安装
npm 或 yarn 安装
```
# npm
$ npm install tactile-ui-vue3 --save

# yarn
$ yarn add tactile-ui-vue3
```

## 引入 & 使用
代码示例：
```
<template>
  <div>
    <Button>按钮</Button>
  </div>
</template>
<script>
import {Button, Tabs, Tab, Switch, Dialog, openDialog} from "tactile-ui-vue3"
export default {
  components: {Button}
}
</script>
```

下一节：[Switch组件](#/doc/switch)