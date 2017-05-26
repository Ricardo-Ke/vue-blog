<template>
  <nav class="navbar-box">
    <div class="navbar-logo">
      <router-link to="/" class="navbar-link">Ke</router-link>
    </div>
    <div class="navbar-expanded">
      <router-link v-if="loginState" to="/login" tag="i" class="iconfont">&#xe67e;</router-link>
      <i v-else @click="logout" class="iconfont">&#xe608;</i>
    </div>
  </nav>
</template>

<script>
/* eslint-disable */
const AV = require('leancloud-storage/dist/av')

export default {
  name: 'nav-bar',
  data () {
    return {}
  },
  computed: {
    loginState () {
      return !this.$store.getters.getLoginState
    }
  },
  methods: {
    logout () {
      this.$store.commit('changeLoginState', false)
      AV.User.logOut()
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="stylus">
.navbar-box
  position fixed
  left 0
  top 0
  width 45px
  height 100%
  z-index 100
  box-shadow 0 1px 4px #eee
  background-color #2a2a2a
  .navbar-logo
    height 45px
    text-align center
    line-height 45px
    .navbar-link
      display block
      color white
      background-color #ea6f5a
  .navbar-expanded
    position absolute
    display block
    width 100%
    bottom 0
    .iconfont
      display block
      position absolute
      bottom 0
      width 100%
      padding-top 5px
      padding-bottom 10px
      text-align center
      color white
      cursor pointer
</style>
