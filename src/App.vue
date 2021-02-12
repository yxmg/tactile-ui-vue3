<template>
  <div>导航栏</div>
  <div>
    <router-link to="/">Custom Component</router-link>
    |
    <router-link to="/xxx">Second Component</router-link>
  </div>
  <hr />
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App'
}
</script>
