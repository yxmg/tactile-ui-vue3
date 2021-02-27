<template>
  <article class="markdown-body" v-if="content" v-html="content"/>
</template>

<script lang="ts">
export default {
  name: "markdown",
  props: {
    content: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep(ul) {
  list-style: disc;
}
</style>