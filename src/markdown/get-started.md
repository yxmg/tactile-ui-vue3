# 快速上手
## 安装
npm 或 yarn 安装
```bash
# npm
$ npm install tiny-ui --save

# yarn
$ yarn add tiny-ui
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
import {Button, Tabs, Switch, Dialog} from "tiny-ui"
export default {
  components: {Button}
}
</script>
```

下一节：[Switch组件](#/doc/switch)