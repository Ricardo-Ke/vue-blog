<template>
  <div id="main-context">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'app',
  components: {
    'nav-bar': Navbar
  }
}
</script>

<style lang="stylus">
#backend-container
  position relative
  margin-left 45px
</style>
