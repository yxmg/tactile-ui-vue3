<template>
  <article class="markdown-body" v-html="getStartedMd"/>
</template>

<script lang="ts">
import getStartedMd from '../markdown/get-started.md'

export default {
  name: "get-started",
  data() {
    return {
      getStartedMd
    }
  }
}
</script>

<style scoped>

</style>