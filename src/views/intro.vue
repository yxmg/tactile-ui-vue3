<template>
  <article class="markdown-body" v-html="introMd" />
</template>

<script lang="ts">
import introMd from '../markdown/intro.md'

export default {
  name: "intro",
  data() {
    return { introMd }
  }
}
</script>

<style scoped>

</style>