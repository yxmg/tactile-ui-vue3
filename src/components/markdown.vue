<template>
  <article class="markdown-body" v-if="md" v-html="md"/>
</template>

<script lang="ts">
import {ref} from 'vue'

export default {
  name: "markdown",
  props: {
    path: String
  },
  setup(props) {
    const md = ref('')
    if (props.path) {
      import(props.path)
        .then(context => {
          md.value = context.default
        })
    }
    return { md }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  ul {
    list-style: disc;
  }
}
</style>