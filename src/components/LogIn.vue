<template>
  <div id="posts-content">
    <form id="login-form">
      <div class="form-item">
        <label class="item-icon">
          <i class="iconfont">&#xe673;</i>
        </label>
        <div class="item-input">
            <input v-model="account" type="text" require>
        </div>
      </div>

      <div class="form-item">
        <label class="item-icon">
          <i class="iconfont">&#xe61b;</i>
        </label>
        <div class="item-input">
          <input v-model="password" type="password" require>
        </div>
      </div>

      <div class="form-item">
        <button @click="login($event)" type="submit" class="form-button">登录</button>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import { mapMutations } from 'vuex'
const AV = require('leancloud-storage/dist/av')

export default {
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login (event) {
      let self = this
      if (event) event.preventDefault()

      AV.User.logIn(self.account, self.password).then(function (User) {
        self.changeLoginState(true)

        self.$message({
          message: '登录成功~',
          type: 'success',
          duration: 1000,
          onClose () {
            self.$router.push({path: '/backend'})
          }
        })

      }, function (error) {
        if (error) {
          self.$message({
            message: '账号或者密码不正确呦~~~',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    ...mapMutations([
      'changeLoginState'
    ])
  }
}
</script>

<style lang="stylus">
#posts-content
  padding-top 150px
#login-form
  width 50%
  max-width 400px
  min-width 320px
  margin 0 auto 0 auto
  padding 8px
  box-sizing border-box
  .form-item
    margin-bottom 20px
    border-radius 3px
    &:last-child
      border 0
    .item-icon
      float left
      width 37px
      text-align center
      vertical-align middle
      font-size 14px
      padding 9px 0 10px 0
      border-top 1px solid #ddd
      border-left 1px solid #ddd
      border-bottom 1px solid #ddd
      border-radius 3px 0 0 3px
    .item-input
      margin-left 38px
      line-height 38px
      input
        border 0
        border-radius 0 3px 3px 0
        border 1px solid #ddd
        display block
        box-sizing border-box
        height 38px
        font-size 18px
        width 100%
        padding 3px 10px
        transition border-color .2s cubic-bezier(.645,.045,.355,1)
        line-height 1
        color #1f2d3d
        &:focus
          outline none
          border-color #20a0ff
    .form-button
      display inline-block
      box-sizing border-box
      white-space nowrap
      text-align center
      outline none
      width 100%
      margin-bottom 10px
      padding 10px 15px
      font-size 16px
      border 1px solid #20a0ff
      border-radius 4px
      cursor pointer
      color #fff
      background-color #20a0ff
</style>
