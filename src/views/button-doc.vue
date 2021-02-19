<template>
  <div class="button-doc">
    <h1 style="margin-bottom: 12px;">示例1-theme</h1>
    <div style="margin-bottom: 24px;">
      <Button>Default</Button>
      <Button theme="primary">Primary</Button>
      <Button theme="danger">Danger</Button>
      <Button theme="success">Success</Button>
    </div>
    <h1 style="margin-bottom: 12px;">示例2-size</h1>
    <div style="margin-bottom: 24px;">
      <Button size="large">Large</Button>
      <Button size="large" link>Large</Button>
    </div>
    <div style="margin-bottom: 24px;">
      <Button>Medium</Button>
      <Button>Medium</Button>
    </div>
    <div style="margin-bottom: 24px;">
      <Button>Small</Button>
      <Button>Small</Button>
    </div>
    <h1 style="margin-bottom: 12px;">示例3-disabled</h1>
    <div style="margin-bottom: 24px;">
      <Button disabled>Default</Button>
      <Button disabled theme="primary">Primary</Button>
      <Button disabled theme="danger">Danger</Button>
      <Button disabled theme="success">Success</Button>
    </div>
    <h1 style="margin-bottom: 12px;">示例4-shape</h1>
    <div style="margin-bottom: 24px;">
      <Button theme="primary" shape="rect">Rect</Button>
      <Button theme="primary">Round</Button>
      <Button theme="primary" shape="circle">Circle</Button>
    </div>
    <h1 style="margin-bottom: 12px;">示例5-loading</h1>
    <div style="margin-bottom: 24px;">
      <Button theme="primary" shape="rect" loading>Rect</Button>
      <Button theme="primary" loading>Round</Button>
      <Button theme="primary" shape="circle" loading>Circle</Button>
      <Button theme="primary" link loading>Circle</Button>
    </div>
  </div>
</template>

<script lang="ts">
import Button from '../lib/button.vue'

export default {
  name: "button-doc",
  components: { Button },
  setup() {
    const onClick = () => {
      console.log('hi')
    }
    return { onClick }
  }
}
</script>

<style lang="scss" scoped>
.button-doc {
  .t-button {
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
</style>