<template>
  <div>
    <h1>Switch 组件示例 </h1>
    <div class="demo">
      <h2>常规用法</h2>
      <div class="demo-component">
        <component :is="normalDemo"></component>
      </div>
      <div class="demo-actions">
        <Button>查看代码</Button>
      </div>
      <div class="demo-code">
        <pre>{{ normalDemo.__sourceCode }}</pre>
      </div>
    </div>
    <div class="demo">
      <h2>支持 disabled </h2>
      <div class="demo-component">
        <component :is="disabledDemo"></component>
      </div>
      <div class="demo-actions">
        <Button>查看代码</Button>
      </div>
      <div class="demo-code">
        <pre>{{ disabledDemo.__sourceCode }}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Switch from "../../lib/switch.vue"
import Button from '../../lib/button.vue'
import normalDemo from './components/normal-demo.vue'
import disabledDemo from './components/disabled-demo.vue'
import {ref} from 'vue'

export default {
  name: "switch-doc",
  components: { Switch, Button },
  setup() {
    const switchValue = ref(true)
    return { switchValue, normalDemo, disabledDemo }
  }
}
</script>

<style lang="scss" scoped>
$border-color: #d9d9d9;
.demo {
  border: 1px solid $border-color;
  margin: 16px 0 32px;

  > h2 {
    font-size: 20px;
    padding: 8px 16px;
    border-bottom: 1px solid $border-color;
  }

  &-component {
    padding: 16px;
  }

  &-actions {
    padding: 8px 16px;
    border-top: 1px dashed $border-color;
  }

  &-code {
    padding: 8px 16px;
    border-top: 1px dashed $border-color;

    > pre {
      line-height: 1.1;
      font-family: Consolas, 'Courier New', Courier, monospace;
      margin: 0;
    }
  }
}
</style>